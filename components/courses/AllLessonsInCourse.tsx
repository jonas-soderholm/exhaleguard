"use client";

import { LessonButton } from "@/components/courses/LessonButton";

interface Lesson {
  name: string;
  link: string;
  position: string;
  done?: boolean;
  enabled?: boolean;
}

interface Level {
  title: string;
  lessons: Lesson[];
}

const preprocessLessons = (lessons: Level[], lessonNr: number): Level[] => {
  if (!Array.isArray(lessons)) {
    console.error("Error: lessonsData is not an array", lessons);
    return [];
  }

  let currentIndex = 0;
  return lessons.map((level) => ({
    ...level,
    lessons: level.lessons.map((lesson) => {
      const isDone = currentIndex < lessonNr;
      const isEnabled = currentIndex <= lessonNr;
      currentIndex++;
      return { ...lesson, done: isDone, enabled: isEnabled };
    }),
  }));
};

interface AllLessonsInCourseProps {
  lessonName: string;
  lessonsData: Level[] | undefined;
  lessonNr: number;
  courseNr: number;
  baseUrl: string;
}

export default function AllLessonsInCourse({
  lessonName,
  lessonsData,
  lessonNr,
  baseUrl,
}: AllLessonsInCourseProps) {
  const lessons = preprocessLessons(
    Array.isArray(lessonsData) ? lessonsData : [],
    lessonNr
  );

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-xl md:text-3xl font-bold text-center">
        {lessonName}
      </h1>

      {lessons.map((lessonGroup, courseIndex) => (
        <div key={courseIndex} className="w-full max-w-3xl">
          <h2 className="text-lg text-center mb-6">{lessonGroup.title}</h2>
          <div className="bg-gray-700 p-6 rounded-lg border border-gray-500">
            <ul className="timeline timeline-vertical relative">
              {lessonGroup.lessons.map((lesson, lessonIndex) => (
                <li key={lessonIndex} className="relative">
                  <div
                    className={`timeline-${lesson.position} timeline-box bg-transparent border-transparent shadow-none`}
                  >
                    <div className="absolute left-1/2 top-0 h-full w-[2px] bg-slate-200 transform -translate-x-1/2"></div>
                    <LessonButton
                      lessonName={lesson.name}
                      link={lesson.enabled ? `${baseUrl}${lesson.link}` : "#"}
                      disabled={!lesson.enabled}
                      done={lesson.done}
                    />
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    {lesson.done ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-white bg-green-500 rounded-full p-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.292a1 1 0 00-1.408 0L8 12.586l-2.296-2.296a1 1 0 10-1.408 1.416l3 3a1 1 0 001.408 0l8-8a1 1 0 000-1.416z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : lesson.enabled ? (
                      <div className="h-4 w-4 bg-white rounded-full flex items-center justify-center border border-gray-300">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    ) : (
                      <div className="h-4 w-4 bg-white rounded-full border border-gray-300"></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
