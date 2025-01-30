import LessonClient from "@/components/lessons/LessonClient";
import { getIdAndSub } from "@/utils/redirect-user";
import { redirect } from "next/navigation";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>; // Explicit Promise type
}) {
  // Await params to extract course and lesson
  const { course, lesson } = await params;
  const { userId, subscribed } = await getIdAndSub();

  // Perform subscription check
  if (!subscribed || !userId) {
    redirect("/sign-in");
  }

  // Return the client component
  return <LessonClient courseSlug={course} lesson={lesson} />;
}
