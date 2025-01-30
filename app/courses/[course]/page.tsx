import { redirect } from "next/navigation";
import AllLessonsInCourse from "@/components/courses/AllLessonsInCourse";
import { CourseInfo } from "@/constants/course-info";
import { ensureAndGetAllProgress } from "@/utils/course-progression/course-progression-actions";
import { getUserId } from "@/utils/user-actions/get-user";
import { isSubscribedNew } from "@/utils/user-actions/subscription";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;

  const courseEntry = Object.values(CourseInfo).find(
    (entry) => entry.path.split("/").pop() === course
  );

  if (!courseEntry) {
    throw new Error(`No course found for URL: ${course}`);
  }

  // Fetch user ID once
  const userId = await getUserId();
  if (!userId) redirect("/sign-in");

  // Fetch subscription & progress in one **optimized** query
  const [isSubscribed, progress] = await Promise.all([
    isSubscribedNew(userId),
    ensureAndGetAllProgress(courseEntry.courseNr), // ✅ This should now run only **once**
  ]);

  if (!isSubscribed) redirect("/sign-in");

  // ✅ Import lesson data once
  const lessonsData = (
    await import(`@/data/lessons/${courseEntry.folderName}/all-lesson-buttons`)
  ).default;

  return (
    <AllLessonsInCourse
      lessonName={courseEntry.courseName}
      courseNr={courseEntry.courseNr}
      lessonsData={lessonsData}
      lessonNr={progress?.lessonNr ?? 0} // ✅ Avoids unnecessary re-fetching
      baseUrl={courseEntry.path}
    />
  );
}
