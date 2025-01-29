"use server";

import prisma from "../prisma";
import { getUserId } from "../user-actions/get-user";

export async function createCourseAndProgress(courseNr: number) {
  try {
    const userId = await getUserId();

    await prisma.$transaction([
      prisma.course.upsert({
        where: { id: courseNr },
        update: {}, // No updates needed for existing courses
        create: { id: courseNr, name: `Course ${courseNr}` },
      }),
      prisma.progress.upsert({
        where: { userId_courseNr: { userId, courseNr } },
        update: {}, // No updates needed for existing progress
        create: {
          userId,
          courseNr,
          lessonNr: 0,
          sectionNr: 0,
          completed: false,
        },
      }),
    ]);
  } catch (error) {
    console.error(
      `Error ensuring course ${courseNr} and progress for user:`,
      error
    );
  }
}

// Fetch both Course and Progress in a single query
export async function getCourseWithProgress(courseNr: number, userId?: string) {
  const courseData = await prisma.course.findUnique({
    where: { id: courseNr },
    include: {
      progress: {
        where: { userId },
        select: {
          lessonNr: true,
          sectionNr: true,
          completed: true,
        },
      },
    },
  });

  return {
    course: courseData,
    progress: courseData?.progress[0] || {
      lessonNr: 0,
      sectionNr: 0,
      completed: false,
    },
  };
}

export async function ensureAndGetCourseProgress(courseNr: number) {
  try {
    const userId = await getUserId();

    // ✅ Ensure course & progress exist, then fetch both in a single query
    const [_, progress] = await prisma.$transaction([
      prisma.course.upsert({
        where: { id: courseNr },
        update: {},
        create: { id: courseNr, name: `Course ${courseNr}` },
      }),
      prisma.progress.upsert({
        where: { userId_courseNr: { userId, courseNr } },
        update: {},
        create: {
          userId,
          courseNr,
          lessonNr: 0,
          sectionNr: 0,
          completed: false,
        },
      }),
    ]);

    return progress;
  } catch (error) {
    console.error(`Error ensuring/fetching course ${courseNr}:`, error);
    return { lessonNr: 0, sectionNr: 0, completed: false };
  }
}

export async function updateSectionNr(courseNr: number) {
  const userId = await getUserId(); // Obtain the user ID dynamically
  try {
    await prisma.$transaction(async (tx) => {
      // Increment the section number in the Progress table for the given user and course
      await tx.progress.update({
        where: {
          userId_courseNr: {
            userId: userId,
            courseNr: courseNr,
          },
        },
        data: {
          sectionNr: {
            increment: 1, // Increment the current value of sectionNr by 1
          },
        },
      });
    });

    console.log(
      `Section number incremented for course ${courseNr} and user ${userId}.`
    );
  } catch (error) {
    console.error(
      `Error incrementing section number for course ${courseNr} and user ${userId}:`,
      error
    );
  } finally {
    await prisma.$disconnect(); // Optional, depends on your environment
  }
}

export async function updateLessonNr(courseNr: number, userId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      // Increment the lesson number in the Progress table for the given user and course
      await tx.progress.update({
        where: {
          userId_courseNr: {
            userId: userId,
            courseNr: courseNr,
          },
        },
        data: {
          lessonNr: {
            increment: 1, // Increment the current value of lessonNr by 1
          },
        },
      });
    });

    console.log(
      `Lesson number incremented for course ${courseNr} and user ${userId}.`
    );
  } catch (error) {
    console.error(
      `Error incrementing lesson number for course ${courseNr} and user ${userId}:`,
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function resetSectionNr(courseNr: number, userId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      // Reset the section number in the Progress table for the given user and course
      await tx.progress.update({
        where: {
          userId_courseNr: {
            userId: userId,
            courseNr: courseNr,
          },
        },
        data: {
          sectionNr: 0, // Reset sectionNr to 0
        },
      });
    });

    console.log(
      `Section number reset to 0 for course ${courseNr} and user ${userId}.`
    );
  } catch (error) {
    console.error(
      `Error resetting section number for course ${courseNr} and user ${userId}:`,
      error
    );
  } finally {
    await prisma.$disconnect(); // Optional, depends on your environment
  }
}

export async function getProgress(courseNr: number, userId: string) {
  try {
    const progress = await prisma.progress.findUnique({
      where: { userId_courseNr: { userId, courseNr } },
      select: { lessonNr: true, sectionNr: true }, // Fetch both fields at once
    });

    return {
      lessonNr: progress?.lessonNr || 0,
      sectionNr: progress?.sectionNr || 0,
    };
  } catch (error) {
    console.error(`Error retrieving progress for course ${courseNr}:`, error);
    throw error;
  }
}

export async function courseCompleted(courseNr: number, userId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      // Update the lesson number in the Progress table for the given user and course
      await tx.progress.update({
        where: {
          userId_courseNr: {
            userId: userId,
            courseNr: courseNr,
          },
        },
        data: {
          completed: true,
        },
      });
    });

    console.log(
      `Lesson number updated to ${courseNr} for course ${courseNr} and user ${userId}.`
    );
  } catch (error) {
    console.error(
      `Error updating lesson number to ${courseNr} for course ${courseNr} and user:`,
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function ensureAndGetAllProgress(courseNr: number) {
  const userId = await getUserId();

  return prisma.$transaction(async (tx) => {
    // ✅ First, fetch existing progress
    const existingProgress = await tx.progress.findUnique({
      where: { userId_courseNr: { userId, courseNr } },
      select: { lessonNr: true, sectionNr: true, completed: true },
    });

    if (existingProgress) return existingProgress; // ✅ Avoid unnecessary inserts

    // ✅ If progress doesn't exist, ensure course & progress are inserted **once**
    await tx.course.upsert({
      where: { id: courseNr },
      update: {},
      create: { id: courseNr, name: `Course ${courseNr}` },
    });

    return await tx.progress.create({
      data: {
        userId,
        courseNr,
        lessonNr: 0,
        sectionNr: 0,
        completed: false,
      },
    });
  });
}
