"use server";

import prisma from "../prisma";
import { getUserId } from "../user-actions/get-user";

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

// Create Course and Progress in one go
export async function createCourseAndProgress(courseNr: number) {
  try {
    const userId = await getUserId();

    await prisma.course.upsert({
      where: { id: courseNr },
      update: {},
      create: { id: courseNr, name: `Course ${courseNr}` },
    });

    await prisma.progress.upsert({
      where: { userId_courseNr: { userId, courseNr } },
      update: {},
      create: { userId, courseNr, lessonNr: 0, sectionNr: 0, completed: false },
    });
  } catch (error) {
    console.error(
      `Error ensuring course ${courseNr} and progress for user:`,
      error
    );
  }
}

// Update lesson number efficiently
export async function updateLessonNr(courseNr: number) {
  try {
    const userId = await getUserId();
    await prisma.progress.update({
      where: { userId_courseNr: { userId, courseNr } },
      data: { lessonNr: { increment: 1 } },
    });
  } catch (error) {
    console.error(
      `Error incrementing lesson number for course ${courseNr}:`,
      error
    );
  }
}

// Update section number efficiently
export async function updateSectionNr(courseNr: number) {
  try {
    const userId = await getUserId();
    await prisma.progress.update({
      where: { userId_courseNr: { userId, courseNr } },
      data: { sectionNr: { increment: 1 } },
    });
  } catch (error) {
    console.error(
      `Error incrementing section number for course ${courseNr}:`,
      error
    );
  }
}

// Reset section number
export async function resetSectionNr(courseNr: number) {
  try {
    const userId = await getUserId();
    await prisma.progress.update({
      where: { userId_courseNr: { userId, courseNr } },
      data: { sectionNr: 0 },
    });
  } catch (error) {
    console.error(
      `Error resetting section number for course ${courseNr}:`,
      error
    );
  }
}

// Get all lesson progress at once
export async function getAllLessonProgress(userId: string) {
  try {
    const progress = await prisma.progress.findMany({
      where: { userId },
      select: { courseNr: true, lessonNr: true },
    });

    return new Map(progress.map((p) => [p.courseNr, p.lessonNr]));
  } catch (error) {
    console.error("Error retrieving lesson progress:", error);
    return new Map();
  }
}

// Get lesson number from cached course progress
export async function getLessonNr(courseNr: number) {
  try {
    const { progress } = await getCourseWithProgress(courseNr);
    return progress.lessonNr;
  } catch (error) {
    console.error(
      `Error retrieving lesson number for course ${courseNr}:`,
      error
    );
    return 0;
  }
}

// Get section number from cached course progress
export async function getSectionNr(courseNr: number) {
  try {
    const { progress } = await getCourseWithProgress(courseNr);
    return progress.sectionNr;
  } catch (error) {
    console.error(
      `Error retrieving section number for course ${courseNr}:`,
      error
    );
    return 0;
  }
}

// Mark course as completed
export async function courseCompleted(courseNr: number) {
  try {
    const userId = await getUserId();
    await prisma.progress.update({
      where: { userId_courseNr: { userId, courseNr } },
      data: { completed: true },
    });
  } catch (error) {
    console.error(`Error marking course ${courseNr} as completed:`, error);
  }
}
