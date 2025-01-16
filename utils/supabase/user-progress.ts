import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchUserProgress(userId: string) {
  const progress = await prisma.progress.findMany({
    where: { userId },
    include: { course: true },
  });

  console.log(progress);
  return progress;
}

async function updateProgress(
  userId: string,
  courseId: number,
  lessonNr: number,
  sectionNr: number
) {
  const progress = await prisma.progress.upsert({
    where: { userId_courseId: { userId, courseId } }, // Unique composite key
    create: {
      userId,
      courseId,
      lessonNr,
      sectionNr,
      completed: false,
    },
    update: {
      lessonNr,
      sectionNr,
    },
  });

  console.log(`Updated progress:`, progress);
}
