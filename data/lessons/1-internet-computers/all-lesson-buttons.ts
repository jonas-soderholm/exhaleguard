import { CourseInfo } from "@/constants/course-info";

export const internetAllLessonButtons = [
  {
    courseNr: CourseInfo.InternetAndComputers.courseNr,
    title: "Level 1",
    lessons: [
      {
        name: "INTERNET: How Long Does It Take to Hack?",
        link: "/internet-computer-basics",
        position: "start",
      },
      {
        name: "Who Can See Your Activity Online?",
        link: "/who-can-see",
        position: "end",
      },
    ],
  },
  {
    title: "Level 2",
    lessons: [
      {
        name: "Phishing Scams: Recognizing the Threat",
        link: "/phishing-scams",
        position: "start",
      },
    ],
  },
];

// Calculate the total number of lessons
export const internetComputerTotalLessons = internetAllLessonButtons.reduce(
  (total, level) => total + (level.lessons?.length || 0),
  0
);

export default internetAllLessonButtons;
