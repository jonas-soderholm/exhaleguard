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

import LessonClient from "./LessonClient";
import { redirectIfNotSubscribed } from "@/utils/user-actions/subscription";

interface LessonPageProps {
  params: {
    course: string;
    lesson: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  // Destructure course and lesson from params
  const { course, lesson } = params;

  // Perform subscription check server-side
  await redirectIfNotSubscribed();

  // Pass courseSlug and lesson to the client-side component
  return <LessonClient courseSlug={course} lesson={lesson} />;
}
