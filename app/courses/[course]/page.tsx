// import { redirect } from "next/navigation";
// import AllLessonsInCourse from "@/components/courses/AllLessonsInCourse";
// import { CourseInfo } from "@/constants/course-info";
// import { ensureAndGetCourseProgress } from "@/utils/course-progression/course-progression-actions";
// import { getUserId } from "@/utils/user-actions/get-user";
// import { isSubscribedNew } from "@/utils/user-actions/subscription";

// export default async function CoursePage({
//   params: rawParams, // ✅ Use `rawParams` to ensure proper handling
// }: {
//   params: { course: string };
// }) {
//   const params = await Promise.resolve(rawParams); // ✅ Ensure params are properly awaited
//   const { course } = params;

//   // ✅ Define `courseEntry` before making any calls
//   const courseEntry = Object.values(CourseInfo).find(
//     (entry) => entry.path.split("/").pop() === course
//   );

//   if (!courseEntry) {
//     throw new Error(`No course found for URL: ${course}`);
//   }

//   // ✅ Fetch user ID, subscription status, and course progress in parallel
//   const userId = await getUserId();
//   if (!userId) redirect("/sign-in");

//   const [isSubscribed, progress] = await Promise.all([
//     isSubscribedNew(userId),
//     ensureAndGetCourseProgress(courseEntry.courseNr),
//   ]);

//   if (!isSubscribed) redirect("/sign-in");

//   // ✅ Import lesson data (AFTER ensuring course & progress exist)
//   const lessonsData = await import(
//     `@/data/lessons/${courseEntry.folderName}/all-lesson-buttons`
//   );

//   if (!Array.isArray(lessonsData.default)) {
//     console.error("Invalid lessonsData format:", lessonsData.default);
//     throw new Error("Invalid lessonsData format. Expected an array.");
//   }

//   return (
//     <AllLessonsInCourse
//       lessonName={courseEntry.courseName}
//       courseNr={courseEntry.courseNr}
//       lessonsData={lessonsData.default}
//       lessonNr={progress.lessonNr}
//       baseUrl={courseEntry.path}
//     />
//   );
// }

import { redirect } from "next/navigation";
import AllLessonsInCourse from "@/components/courses/AllLessonsInCourse";
import { CourseInfo } from "@/constants/course-info";
import { ensureAndGetAllProgress } from "@/utils/course-progression/course-progression-actions";
import { getUserId } from "@/utils/user-actions/get-user";
import { isSubscribedNew } from "@/utils/user-actions/subscription";

export default async function CoursePage({
  params: rawParams,
}: {
  params: { course: string };
}) {
  const params = await Promise.resolve(rawParams);
  const { course } = params;

  // ✅ Find the course entry once
  const courseEntry = Object.values(CourseInfo).find(
    (entry) => entry.path.split("/").pop() === course
  );

  if (!courseEntry) {
    throw new Error(`No course found for URL: ${course}`);
  }

  // ✅ Fetch user ID once
  const userId = await getUserId();
  if (!userId) redirect("/sign-in");

  // ✅ Fetch subscription status & progress in **one** query
  const [isSubscribed, progressMap] = await Promise.all([
    isSubscribedNew(userId),
    ensureAndGetAllProgress([courseEntry.courseNr]), // Fetch all progress at once
  ]);

  if (!isSubscribed) redirect("/sign-in");

  // ✅ Import lesson data
  const lessonsData = await import(
    `@/data/lessons/${courseEntry.folderName}/all-lesson-buttons`
  );

  if (!Array.isArray(lessonsData.default)) {
    console.error("Invalid lessonsData format:", lessonsData.default);
    throw new Error("Invalid lessonsData format. Expected an array.");
  }

  // ✅ Get progress for this specific course
  const progress = progressMap.get(courseEntry.courseNr) || { lessonNr: 0 };

  return (
    <AllLessonsInCourse
      lessonName={courseEntry.courseName}
      courseNr={courseEntry.courseNr}
      lessonsData={lessonsData.default}
      lessonNr={progress.lessonNr} // ✅ Now this is from a batch fetch
      baseUrl={courseEntry.path}
    />
  );
}
