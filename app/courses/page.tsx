// import CourseCard from "@/components/courses/CourseCard";
// import { allCourses } from "@/data/courses/all-courses";
// import { getLessonNr } from "@/utils/course-progression/course-progression-actions";
// import { getUserId } from "@/utils/user-actions/get-user";
// import { isSubscribed } from "@/utils/user-actions/subscription";

// export default async function AllCourses() {
//   let userId: string | null = null;
//   let subscribed = false;

//   // // CREATE SUBSCRIPTION TEST
//   // try {
//   //   // Fetch the user ID
//   //   userId = await getUserId();

//   //   if (userId) {
//   //     // Check if the user is subscribed
//   //     subscribed = await isSubscribed();

//   //     // Call createSubscription if the user is not subscribed
//   //     if (!subscribed) {
//   //       await createOrUpdateSubscription();
//   //       console.log("Subscription created for user:", userId);
//   //     }
//   //   }
//   // } catch (error) {
//   //   console.error("Error fetching user or creating subscription:", error);
//   // }

//   try {
//     // Try to fetch the user ID
//     userId = await getUserId();

//     // Check if the user is subscribed
//     subscribed = await isSubscribed();
//   } catch (error) {
//     console.error("An error occurred:", error);
//     // User not authenticated
//     userId = null;
//   }

//   // Fetch progress for all courses if user is logged in and subscribed
//   const courseProgress =
//     userId && subscribed
//       ? await Promise.all(
//           allCourses.map(async (course) => {
//             const lessonNr = await getLessonNr(course.courseNr);
//             const progress = Math.min(
//               (lessonNr / course.lessonAmount) * 100,
//               100
//             ); // Clamp progress to 100%
//             return { courseNr: course.courseNr, progress };
//           })
//         )
//       : [];

//   return (
//     <>
//       <h1 className="text-3xl font-bold text-center my-8">Courses</h1>
//       <div className="flex flex-col items-center px-4">
//         {allCourses.map((course) => {
//           // Find progress for the course or default to 0 if user not logged in or subscribed
//           const progress =
//             courseProgress.find((p) => p.courseNr === course.courseNr)
//               ?.progress || 0;

//           // Determine button text based on user state
//           const buttonText = !userId
//             ? "Sign In"
//             : !subscribed
//               ? "Get Access"
//               : progress === 0
//                 ? "Start"
//                 : progress === 100
//                   ? "Revisit Course"
//                   : "Continue";

//           // Determine link URL based on user state
//           const linkUrl = !userId
//             ? "/sign-in"
//             : !subscribed
//               ? "/account?tab=1"
//               : course.linkUrl;

//           return (
//             <CourseCard
//               key={course.courseNr}
//               title={course.title}
//               courseNr={course.courseNr}
//               lessonAmount={course.lessonAmount}
//               description={course.description}
//               buttonText={buttonText}
//               image={course.image}
//               linkUrl={linkUrl}
//               progress={progress}
//             />
//           );
//         })}
//       </div>
//     </>
//   );
// }

import CourseCard from "@/components/courses/CourseCard";
import { allCourses } from "@/data/courses/all-courses";
import { getLessonNr } from "@/utils/course-progression/course-progression-actions";
import { getUserId } from "@/utils/user-actions/get-user";
import { isSubscribed } from "@/utils/user-actions/subscription";

export default async function AllCourses() {
  let userId: string | null = null;
  let subscribed = false;

  try {
    // Fetch the user ID
    userId = await getUserId();
    subscribed = await isSubscribed();
  } catch (error) {
    console.error("An error occurred:", error);
    userId = null;
  }

  // Fetch progress for all courses in parallel
  const courseProgress =
    userId && subscribed
      ? await Promise.allSettled(
          allCourses.map(async (course) => {
            try {
              const lessonNr = await getLessonNr(course.courseNr);
              return {
                courseNr: course.courseNr,
                progress: Math.min((lessonNr / course.lessonAmount) * 100, 100),
              };
            } catch (error) {
              console.error(
                `Failed to fetch progress for course ${course.courseNr}:`,
                error
              );
              return { courseNr: course.courseNr, progress: 0 }; // Default to 0% on failure
            }
          })
        )
      : [];

  // Convert results into a fast lookup map
  const progressMap = new Map();
  courseProgress.forEach((result) => {
    if (result.status === "fulfilled") {
      progressMap.set(result.value.courseNr, result.value.progress);
    }
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">Courses</h1>
      <div className="flex flex-col items-center px-4">
        {allCourses.map((course) => {
          // Use progressMap instead of incorrect courseProgress.find()
          const progress = progressMap.get(course.courseNr) || 0;

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
