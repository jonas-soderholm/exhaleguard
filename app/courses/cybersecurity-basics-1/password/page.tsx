"use client";

import Lessons from "@/components/courses/lessons/LessonEngine";

const lessonData = {
  title: "Password Security",
  courseId: 101,
  lessonId: 10101,
  sections: [
    {
      id: 1,
      sectionTitle: "How to Create Secure Passwords",
      content: [
        "Passwords should be long and unique for each account.",
        "This helps protect your accounts from hackers.",
      ],
      question: "What should passwords be?",
      answer: "asd",
    },
    {
      id: 2,
      sectionTitle: "Using Password Managers",
      content: [
        "Using a password manager helps you create secure passwords.",
        "It also stores your passwords safely.",
      ],
      question: "What tool helps create and store passwords?",
      answer: "asd",
    },
    {
      id: 3,
      sectionTitle: "Using Password Managers",
      content: [
        "Using a password manager helps yg a password manager helps yg a password manager helps you create secg a password manager helps yg a password manager helps yure passwords.",
        "It also stores yourg a password manager helps yg a password manager helps yg a password manager helps yg a password manager helps yg a password manager helps yg a password manager helps yg a password manager helps y passwords safely.",
      ],
      question: "What tool helps create and store passwords?",
      answer: "asd",
    },
  ],
};

export default function Password() {
  return <Lessons title={lessonData.title} sections={lessonData.sections} />;
}
