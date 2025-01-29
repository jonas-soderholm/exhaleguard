import AllLessonsInCourse from "@/components/courses/AllLessonsInCourse";
import { CourseInfo } from "@/constants/course-info";
import { getLessonNr } from "@/utils/course-progression/course-progression-actions";
import { redirectIfNotSubscribed } from "@/utils/user-actions/subscription";

export const revalidate = 0;

export default async function CoursePage({
  params: rawParams,
}: {
  params: { course: string };
}) {
  await redirectIfNotSubscribed();

  const params = await Promise.resolve(rawParams); // Ensure params are awaited

  const { course } = params;

  // Find the course dynamically based on the URL
  const courseEntry = Object.values(CourseInfo).find(
    (entry) => entry.path.split("/").pop() === course
  );

  if (!courseEntry) {
    throw new Error(`No course found for URL: ${course}`);
  }

  // Dynamically import the lesson buttons from the course folder
  const lessonsData = await import(
    `@/data/lessons/${courseEntry.folderName}/all-lesson-buttons`
  );

  // console.log(
  //   "Dynamic import path:",
  //   `@/data/lessons/${courseEntry.folderName}/all-lesson-buttons`
  // );
  // console.log("Imported lessonsData:", lessonsData);

  const resolvedLessons = lessonsData.default;

  if (!Array.isArray(resolvedLessons)) {
    console.error("Invalid lessonsData format:", resolvedLessons);
    throw new Error("Invalid lessonsData format. Expected an array.");
  }

  // Get the current lesson number for the course
  const currentLessonNr = await getLessonNr(courseEntry.courseNr);

  return (
    <AllLessonsInCourse
      lessonName={courseEntry.courseName}
      courseNr={courseEntry.courseNr}
      lessonsData={resolvedLessons}
      lessonNr={currentLessonNr}
      baseUrl={courseEntry.path}
    />
  );
}
