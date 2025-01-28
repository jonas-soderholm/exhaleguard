import { CourseInfo } from "@/constants/course-info";

export const internetAndComputersData = {
  courseNr: CourseInfo.Cyber1.courseNr,
  lessonsOverviewUrl: CourseInfo.Cyber1.path,
  sections: [
    {
      id: 1,
      sectionTitle: "CYVER?",
      content: [
        "A password is often the first line of defense against unauthorized access to your online accounts. Weak passwords make it easier for attackers to gain control over your sensitive information.",
        "Using strong passwords reduces the likelihood of your accounts being compromised in case of brute force or dictionary attacks. Strong passwords are also harder to guess or crack, even by sophisticated algorithms.",
        "Hackers often exploit commonly used passwords or personal details such as birth dates. It's important to create passwords that are unrelated to your personal information and follow modern security guidelines.",
      ],
      question: "Why are strong passwords important?",
      answerKeywords: [
        "asd",
        "12 characters",
        "uppercase",
        "lowercase",
        "numbers",
        "special characters",
      ],
      images: ["", "/images/hero/device-mockup.png"],
    },
  ],
};
