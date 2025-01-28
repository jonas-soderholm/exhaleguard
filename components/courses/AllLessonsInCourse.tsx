"use client";

import { LessonButton } from "@/components/courses/LessonButton";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Function to preprocess lessons based on progress
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

// Export variable to capture the `done` state globally
export let exportedDoneState: boolean | null = null;

const preprocessLessons = (lessons: Level[], lessonNr: number): Level[] => {
  let currentIndex = 0; // Tracks the global lesson index
  return lessons.map((level) => ({
    ...level,
    lessons: level.lessons.map((lesson) => {
      const isDone = currentIndex < lessonNr;
      const isEnabled = currentIndex <= lessonNr; // Current and past lessons are enabled
      currentIndex++;
      return { ...lesson, done: isDone, enabled: isEnabled };
    }),
  }));
};

interface AllLessonsInCourseProps {
  lessonName: string;
  lessonsData: Level[];
  lessonNr: number; // Current lesson number
  courseNr: number;
  baseUrl: string;
}

export default function AllLessonsInCourse({
  lessonName,
  lessonsData,
  lessonNr,
  baseUrl,
}: AllLessonsInCourseProps) {
  // Process lessons with progress
  const lessons = preprocessLessons(lessonsData, lessonNr);
  const pathname = usePathname();
  const initialRender = useRef(true);

  // Rerender if user press back arrow in url to refresh progression
  useEffect(() => {
    if (initialRender.current) {
      // Skip the first render
      initialRender.current = false;
      return;
    }

    console.log("[DEBUG] Pathname changed:", pathname);
    window.location.reload();
  }, [pathname]);

  // Save scroll position when user leaves
  useEffect(() => {
    const handleScroll = () => {
      localStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Restore scroll position on load
  useEffect(() => {
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Page Title */}
      <h1 className="text-xl md:text-3xl font-bold text-center">
        {lessonName}
      </h1>

      {/* Flowchart for Courses */}
      {lessons.map((lessonGroup, courseIndex) => (
        <div key={courseIndex} className=" w-full max-w-3xl">
          <h2 className="text-lg text-center mb-6">{lessonGroup.title}</h2>
          <div className="bg-gray-700 p-6 rounded-lg border border-gray-500">
            <ul className="timeline timeline-vertical relative">
              {lessonGroup.lessons.map((lesson, lessonIndex) => (
                <li key={lessonIndex} className="relative">
                  {/* Lesson Content */}
                  <div
                    className={`timeline-${lesson.position} timeline-box bg-transparent border-transparent shadow-none`}
                  >
                    <div className="absolute left-1/2 top-0 h-full w-[2px] bg-slate-200 transform -translate-x-1/2"></div>
                    <LessonButton
                      lessonName={lesson.name}
                      link={lesson.enabled ? `${baseUrl}${lesson.link}` : "#"} // Disabled lessons are not clickable
                      disabled={!lesson.enabled}
                      done={lesson.done}
                    />
                  </div>

                  {/* Checkmark or Status Indicator */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    {lesson.done ? (
                      // Completed state: Green checkmark
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
                      // Enabled state: Blue dot
                      <div className="h-4 w-4 bg-white rounded-full flex items-center justify-center border border-gray-300">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    ) : (
                      // Disabled state: Plain white circle
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
