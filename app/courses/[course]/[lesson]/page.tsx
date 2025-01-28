// import LessonClient from "@/components/lessons/LessonClient";
// import { redirectIfNotSubscribed } from "@/utils/user-actions/subscription";

// export default async function LessonPage({
//   params,
// }: {
//   params: { course: string; lesson: string };
// }) {
//   // Ensure params is safely accessed
//   const { course, lesson } = await Promise.resolve(params);

//   // Perform subscription check server-side
//   await redirectIfNotSubscribed();

//   // Pass courseSlug and lesson to the client-side component
//   return <LessonClient courseSlug={course} lesson={lesson} />;
// }

import LessonClient from "@/components/lessons/LessonClient";
import { redirectIfNotSubscribed } from "@/utils/user-actions/subscription";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>; // Explicit Promise type
}) {
  // Await params to extract course and lesson
  const { course, lesson } = await params;

  // Perform subscription check
  await redirectIfNotSubscribed();

  // Return the client component
  return <LessonClient courseSlug={course} lesson={lesson} />;
}
