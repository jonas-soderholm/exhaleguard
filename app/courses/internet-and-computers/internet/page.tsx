import LessonEngine from "@/components/lessons/LessonEngine";
import { internetAndComputersData } from "@/app/data/lessons/1-internet-computers/lesson-specific/internet-and-computers";

export default async function Internet() {
  return (
    <LessonEngine
      lessonsOverviewUrl={internetAndComputersData.lessonsOverviewUrl}
      sections={internetAndComputersData.sections}
      courseNr={internetAndComputersData.courseNr}
    />
  );
}
