import { CourseInfo } from "@/constants/course-info";
import { cyber1TotalLessons } from "../lessons/2-cybersecurity-basics-1/all-lesson-buttons";
import { internetComputerTotalLessons } from "../lessons/1-internet-computers/all-lesson-buttons";

export const allCourses = [
  {
    courseNr: CourseInfo.InternetAndComputers.courseNr,
    lessonAmount: internetComputerTotalLessons,
    title: "Internet and Computer Basics",
    description:
      "Learn how computers and the internet work—no prior knowledge needed! Build a foundation for understanding cybersecurity better.",
    buttonText: "Start",
    image: "/images/courses-backgrounds/internetcomputer_bg.jpg",
    linkUrl: CourseInfo.InternetAndComputers.path,
  },
  {
    courseNr: CourseInfo.Cyber1.courseNr,
    lessonAmount: cyber1TotalLessons,
    title: "Cybersecurity Basics 1.0",
    description:
      "Learn the fundamentals of cybersecurity in this beginner-friendly course.",
    buttonText: "Start",
    image: "/images/courses-backgrounds/cyber1_bg.jpg",
    linkUrl: CourseInfo.Cyber1.path,
  },
  {
    courseNr: CourseInfo.Cyber2.courseNr,
    lessonAmount: cyber1TotalLessons,
    title: "Cybersecurity Basics 2.0",
    description:
      "Expand on the basics with more advanced topics and interactive exercises.",
    buttonText: "Start",
    image: "/images/courses-backgrounds/cyber2_bg.jpg",
    linkUrl: CourseInfo.Cyber2.path,
  },
  {
    courseNr: CourseInfo.Privacy.courseNr,
    lessonAmount: cyber1TotalLessons,
    title: "Privacy Basics",
    description:
      "Understand privacy principles and how to protect your personal data.",
    buttonText: "Start",
    image: "/images/courses-backgrounds/privacy_bg.jpg",
    linkUrl: CourseInfo.Privacy.path,
  },
  {
    courseNr: CourseInfo.ThirdParty.courseNr,
    lessonAmount: cyber1TotalLessons,
    title: "Cybersecurity Frameworks and Third-Party Risk Management",
    description:
      "Explore frameworks and strategies for managing third-party cybersecurity risks.",
    buttonText: "Start",
    image: "/images/courses-backgrounds/third_party_bg.jpg",
    linkUrl: CourseInfo.ThirdParty.path,
  },
];
