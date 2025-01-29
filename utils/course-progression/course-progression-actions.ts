"use server";

import prisma from "../prisma";
import { getUserId } from "../user-actions/get-user";

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
    // console.log(`Course ${courseNr} and progress for user ${userId} ensured.`);
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

export async function resetSectionNr(courseNr: number) {
  const userId = await getUserId(); // Obtain the user ID dynamically
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

export async function getSectionNr(courseNr: number) {
  const userId = await getUserId(); // Obtain the user ID dynamically
  try {
    const progress = await prisma.progress.findUnique({
      where: {
        userId_courseNr: {
          userId: userId,
          courseNr: courseNr,
        },
      },
      select: {
        sectionNr: true, // Retrieve only the sectionNr field
      },
    });

    // Return sectionNr or default to 0 if no progress exists
    return progress?.sectionNr || 0;
  } catch (error) {
    console.error(
      `Error retrieving section number for course ${courseNr} and user ${userId}:`,
      error
    );
    throw error; // Re-throw the error to let the caller handle it
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
