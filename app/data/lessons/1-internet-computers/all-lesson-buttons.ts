import { CourseInfo } from "@/app/constants/course-info";

export const internetAllLessonButtons = [
  {
    courseNr: CourseInfo.InternetAndComputers.courseNr,
    title: "Level 1",
    lessons: [
      {
        name: "INTERNET: How Long Does It Take to Hack?",
        link: "/internet",
        position: "start",
      },
      {
        name: "Who Can See Your Activity Online?",
        link: "/internet2",
        position: "end",
      },
    ],
  },
  {
    title: "Level 2",
    lessons: [
      {
        name: "Phishing Scams: Recognizing the Threat",
        link: "/level2/phishing-scams",
        position: "start",
      },
      {
        name: "Malware: Understanding the Basics",
        link: "/level2/malware-basics",
        position: "end",
      },
    ],
  },
];

// Calculate the total number of lessons
export const internetComputerTotalLessons = internetAllLessonButtons.reduce(
  (total, level) => total + (level.lessons?.length || 0),
  0
);
