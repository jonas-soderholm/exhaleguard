import { CourseInfo } from "@/constants/course-info";

const cyber1AllLessonButtons = [
  {
    courseNr: CourseInfo.Cyber1.courseNr,
    title: "Level 1",
    lessons: [
      {
        name: "CYVER1",
        link: "/cyver-lol",
        position: "start",
      },
      {
        name: "CYVER1",
        link: "/cyver-lol2",
        position: "end",
      },
      {
        name: "Passwords: How Long Does It Take to Hack?",
        link: "/password",
        position: "start",
      },
      {
        name: "CYVER1",
        link: "/password2",
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
export const cyber1TotalLessons = cyber1AllLessonButtons.reduce(
  (total, level) => total + (level.lessons?.length || 0),
  0
);

export default cyber1AllLessonButtons;
