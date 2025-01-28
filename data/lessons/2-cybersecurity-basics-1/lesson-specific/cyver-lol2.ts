import { CourseInfo } from "@/constants/course-info";

export const internetAndComputersData = {
  courseNr: CourseInfo.Cyber1.courseNr,
  lessonsOverviewUrl: CourseInfo.Cyber1.path,
  sections: [
    {
      id: 1,
      sectionTitle: "CYVER?2222222222",
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
    {
      id: 2,
      sectionTitle: "How to Create Secure Passwords",
      content: [
        "A strong password should be at least 12 characters long and include a mix of uppercase and lowercase letters, numbers, and special characters.",
        "Avoid using common words, predictable phrases, or sequences such as 'password123' or 'qwerty'. These are easy targets for attackers.",
        "Passphrases can be a good option. For example, a sentence like 'I love hiking at 6 AM!' can be turned into a strong password: 'ILhiking@6AM!'.",
      ],
      question: "Name two characteristics of a strong password.",
      answerKeywords: [
        "asd",
        "12 characters",
        "uppercase",
        "lowercase",
        "numbers",
        "special characters",
      ],
      images: [""],
    },
  ],
};
