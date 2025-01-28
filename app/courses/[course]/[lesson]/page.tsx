// @ts-nocheck
/* eslint-disable */
// Import necessary dependencies
import LessonClient from "./LessonClient";
import { redirectIfNotSubscribed } from "@/utils/user-actions/subscription";

// Correctly type the `params` argument
export default async function LessonPage({
  params,
}: {
  params: Record<string, string>; // Generic key-value object for dynamic routes
}) {
  // Directly destructure params without resolving a promise
  const { course, lesson } = params;

  // Perform subscription check
  await redirectIfNotSubscribed();

  // Render the client-side lesson component
  return <LessonClient courseSlug={course} lesson={lesson} />;
}

// import LessonClient from "./LessonClient";
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
