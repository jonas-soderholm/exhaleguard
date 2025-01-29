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
