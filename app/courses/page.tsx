import React from "react";
import CourseCard from "@/components/courses/CourseCard";
import { allCourses } from "../data/courses/all-courses";
import { getLessonNr } from "@/utils/course-progression-actions";

export default async function AllCourses() {
  // Fetch progress for all courses
  const courseProgress = await Promise.all(
    allCourses.map(async (course) => {
      const lessonNr = await getLessonNr(course.courseNr);
      const progress = Math.min((lessonNr / course.lessonAmount) * 100, 100);
      return { courseNr: course.courseNr, progress };
    })
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">Courses</h1>
      <div className="flex flex-col items-center px-4">
        {allCourses.map((course) => {
          const progress = courseProgress.find(
            (p) => p.courseNr === course.courseNr
          )?.progress;

          return (
            <CourseCard
              key={course.courseNr}
              title={course.title}
              courseNr={course.courseNr}
              lessonAmount={course.lessonAmount}
              description={course.description}
              buttonText={course.buttonText}
              image={course.image}
              linkUrl={course.linkUrl}
              progress={progress || 0} // Pass progress prop
            />
          );
        })}
      </div>
    </>
  );
}
