import CourseCard from "@/components/courses/CourseCard";
import { allCourses } from "@/data/courses/all-courses";
import { getCourseWithProgress } from "@/utils/course-progression/course-progression-actions";
import { getIdAndSub } from "@/utils/redirect-user";

export default async function AllCourses() {
  const { userId, subscribed } = await getIdAndSub();

  // Fetch course and progress data for all courses
  const courseProgressPromises = allCourses.map(async (course) => {
    const { progress } =
      userId && subscribed
        ? await getCourseWithProgress(course.courseNr, userId)
        : { progress: { lessonNr: 0, sectionNr: 0, completed: false } };

    const courseProgress = Math.min(
      (progress.lessonNr / course.lessonAmount) * 100,
      100
    );

    return { courseNr: course.courseNr, progress: courseProgress };
  });

  const courseProgress = await Promise.all(courseProgressPromises);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">Courses</h1>
      <div className="flex flex-col items-center px-4">
        {allCourses.map((course) => {
          const progress =
            courseProgress.find((p) => p.courseNr === course.courseNr)
              ?.progress || 0;

          // Determine button text based on user state
          const buttonText = !userId
            ? "Sign In"
            : !subscribed
              ? "Get Access"
              : progress === 0
                ? "Start"
                : progress === 100
                  ? "Revisit Course"
                  : "Continue";

          // Determine link URL based on user state
          const linkUrl = !userId
            ? "/sign-in"
            : !subscribed
              ? "/account?tab=1"
              : course.linkUrl;

          return (
            <CourseCard
              key={course.courseNr}
              title={course.title}
              courseNr={course.courseNr}
              lessonAmount={course.lessonAmount}
              description={course.description}
              buttonText={buttonText}
              image={course.image}
              linkUrl={linkUrl}
              progress={progress}
            />
          );
        })}
      </div>
    </>
  );
}
