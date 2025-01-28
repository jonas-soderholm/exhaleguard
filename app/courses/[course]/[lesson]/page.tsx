import LessonClient from "./LessonClient";
import { redirectIfNotSubscribed } from "@/utils/user-actions/subscription";

export default async function LessonPage({
  params,
}: {
  params: { course: string; lesson: string };
}) {
  // Ensure params is safely accessed
  const { course, lesson } = await Promise.resolve(params);

  // Perform subscription check server-side
  await redirectIfNotSubscribed();

  // Pass courseSlug and lesson to the client-side component
  return <LessonClient courseSlug={course} lesson={lesson} />;
}
