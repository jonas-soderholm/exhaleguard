"use server";

import { PrismaClient } from "@prisma/client";
import { getUserId } from "./supabase/get-user";

const prisma = new PrismaClient();

export async function createCourseAndProgress(courseNr: number) {
  try {
    const userId = await getUserId();
    await prisma.$transaction(async (tx) => {
      // Create or ensure the course exists
      await tx.course.upsert({
        where: { id: courseNr },
        update: {}, // No updates for existing courses
        create: {
          id: courseNr,
          name: `Course ${courseNr}`,
        },
      });
      // Create or ensure progress exists for the user and course
      await tx.progress.upsert({
        where: {
          userId_courseNr: {
            userId: userId,
            courseNr: courseNr,
          },
        },
        update: {}, // No updates for existing progress
        create: {
          userId: userId,
          courseNr: courseNr,
          lessonNr: 0,
          sectionNr: 0,
          completed: false,
        },
      });
    });
    console.log(`Course ${courseNr} and progress for user ${userId} ensured.`);
  } catch (error) {
    console.error(
      `Error creating or ensuring course ${courseNr} and progress for user:`,
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateLessonNr(courseNr: number) {
  const userId = await getUserId();
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

export async function updateSectionNr(
  courseNr: number,
  sectionNr: number,
  userId: string
) {
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
          sectionNr: sectionNr,
        },
      });
    });

    console.log(
      `Lesson number updated to ${sectionNr} for course ${courseNr} and user ${userId}.`
    );
  } catch (error) {
    console.error(
      `Error updating lesson number to ${sectionNr} for course ${courseNr} and user:`,
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function getLessonNr(courseNr: number) {
  const userId = await getUserId();
  try {
    const progress = await prisma.progress.findUnique({
      where: { userId_courseNr: { userId, courseNr } },
      select: { lessonNr: true },
    });
    return progress?.lessonNr || 0;
  } catch (error) {
    console.error(
      `Error retrieving lesson number for course ${courseNr}:`,
      error
    );
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
