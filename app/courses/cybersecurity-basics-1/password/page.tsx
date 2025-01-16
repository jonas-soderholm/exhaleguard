import LessonEngine from "@/components/lessons/LessonEngine";
import { passwordData } from "@/app/data/lessons/2-cyber1/lesson-specific/password";

export default async function Password() {
  return (
    <LessonEngine
      lessonsOverviewUrl={passwordData.lessonsOverviewUrl}
      sections={passwordData.sections}
      courseNr={passwordData.courseNr}
    />
  );
}
