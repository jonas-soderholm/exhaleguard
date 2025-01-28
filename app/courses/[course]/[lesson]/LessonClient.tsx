"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LessonEngine from "@/components/lessons/LessonEngine";
import { CourseInfo } from "@/constants/course-info";

export default function LessonClient({
  courseSlug,
  lesson,
}: {
  courseSlug: string;
  lesson: string;
}) {
  const pathname = usePathname();

  const [lessonData, setLessonData] = useState<any>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLessonData() {
      console.log("[DEBUG] Fetching lesson data for:", courseSlug, lesson);

      try {
        // Find the course in CourseInfo
        const courseEntry = Object.values(CourseInfo).find(
          (course) => course.path.split("/")[2] === courseSlug
        );

        if (!courseEntry) {
          setError(`No course found for slug: ${courseSlug}`);
          return;
        }

        const course = courseEntry.folderName;

        // Dynamically import all lesson buttons for the course
        const lessonButtons = await import(
          `@/data/lessons/${course}/all-lesson-buttons`
        );

        console.log("[DEBUG] Imported Lesson Buttons:", lessonButtons);

        const allLessons = lessonButtons.default.flatMap(
          (level: any) => level.lessons
        );

        // Match the lesson based on its path
        const relativePath = pathname.replace(`/courses/${courseSlug}`, "");
        const index = allLessons.findIndex((l: any) => l.link === relativePath);

        if (index === -1) {
          setError("Lesson not found.");
          return;
        }

        setCurrentLessonIndex(index);

        // Dynamically import the specific lesson data
        const data = await import(
          `@/data/lessons/${course}/lesson-specific/${lesson}`
        );

        setLessonData(data.default || data.internetAndComputersData);
      } catch (err: any) {
        console.error("[DEBUG] Error loading lesson data:", err.message);
        setError("Failed to load lesson data.");
      }
    }

    fetchLessonData();
  }, [courseSlug, lesson, pathname]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!lessonData) {
    return <p>Loading...</p>;
  }

  return (
    <LessonEngine
      lessonsOverviewUrl={lessonData.lessonsOverviewUrl}
      sections={lessonData.sections}
      courseNr={lessonData.courseNr}
      currentLessonIndex={currentLessonIndex ?? 0}
    />
  );
}
