import { LessonButton } from "@/components/courses/lessons/LessonButton";

// Base URL for lessons
const BASE_URL = "/courses/cybersecurity-basics-1";

// Page title
const lessonName = "Cybersecurity Basics 1.0";

// Courses and lessons
export const lessons = [
  {
    title: "Level 1",
    lessons: [
      {
        name: "Passwords: How Long Does It Take to Hack?",
        link: "/password",
        enabled: true,
        done: false,
        position: "start",
      },
      {
        name: "Public Wi-Fi: A Target for Hackers",
        link: "/password2",
        enabled: false,
        done: false,
        position: "end",
      },
      {
        name: "Social Engineering: Manipulating Trust",
        link: "/password3",
        enabled: false,
        done: false,
        position: "start",
      },
    ],
  },
  {
    title: "Level 2",
    lessons: [
      {
        name: "Phishing Scams: Recognizing the Threat",
        link: "/password4",
        enabled: false,
        done: false,
        position: "end",
      },
      {
        name: "Malware: Understanding the Basics",
        link: "/password5",
        enabled: false,
        done: false,
        position: "start",
      },
      {
        name: "Secure Software: Best Practices",
        link: "/password6",
        enabled: false,
        done: false,
        position: "end",
      },
    ],
  },
];

// Helper function to check button status
const isButtonDisabled = (enabled: boolean) => !enabled;

export default function Basics1() {
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* Page Title */}
      <h1 className="text-xl md:text-3xl font-bold text-center">
        {lessonName}
      </h1>
      {/* Flowchart for Courses */}
      {lessons.map((lesson, courseIndex) => (
        <>
          {/* Course Title */}
          <h2 className="text-lg  text-slate-200 text-left">{lesson.title}</h2>

          <div
            key={courseIndex}
            className="bg-gray-700 p-6 rounded-lg border border-gray-500 max-w-[40rem] w-full"
          >
            {/* Lessons */}
            <ul className="timeline timeline-vertical relative">
              {lesson.lessons.map((lesson, index) => (
                <li key={index} className="relative">
                  {/* Lesson Content */}
                  <div
                    className={`timeline-${lesson.position} timeline-box bg-transparent border-transparent shadow-none`}
                  >
                    <div className="absolute left-1/2 top-0 h-full w-[2px] bg-slate-200 transform -translate-x-1/2"></div>
                    <LessonButton
                      lessonName={lesson.name}
                      link={lesson.enabled ? `${BASE_URL}${lesson.link}` : "#"}
                      disabled={isButtonDisabled(lesson.enabled)}
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
        </>
      ))}
    </div>
  );
}
