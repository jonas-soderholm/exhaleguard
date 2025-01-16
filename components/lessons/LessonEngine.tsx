"use client";

import { useState, useEffect } from "react";
import { LessonProps, Section } from "./LessonLayout";
import LessonContent from "./LessonLayout";
import { updateLessonNr } from "@/utils/course-progression-actions";

export default function LessonEngine({
  sections,
  lessonsOverviewUrl,
  courseNr,
}: LessonProps & {
  courseNr: number;
}) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completedSections, setCompletedSections] = useState<Section[]>([]);
  const [scrollTrigger, setScrollTrigger] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Smoothly scroll to the bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // Trigger scroll after layout updates
  useEffect(() => {
    if (scrollTrigger) {
      scrollToBottom();
      setScrollTrigger(false); // Reset flag to avoid repeated scrolling
    }
  }, [scrollTrigger]);

  const handleNext = () => {
    const section = sections[currentSectionIndex];

    if (currentContentIndex < section.content.length - 1) {
      setCurrentContentIndex((prev) => prev + 1);
      setScrollTrigger(true); // Trigger scroll after updating content index
    }
  };

  const completeLesson = (courseNr: number) => {
    updateLessonNr(courseNr);
    console.log(courseNr);
  };

  const handleSubmit = async () => {
    const currentSection = sections[currentSectionIndex];

    // Normalize user input
    const userInputNormalized = userInput.trim().toLowerCase();

    // Validate against `answerKeywords`
    const isAnswerCorrect = currentSection.answerKeywords.some((keyword) =>
      userInputNormalized.includes(keyword.trim().toLowerCase())
    );

    if (isAnswerCorrect) {
      setFeedback("Correct!");

      setTimeout(() => {
        const isLastSection = currentSectionIndex === sections.length - 1;

        // Add the current section to `completedSections`
        setCompletedSections((prev) => [
          ...prev,
          {
            ...currentSection,
            content: currentSection.content.slice(0, currentContentIndex + 1),
          },
        ]);

        if (isLastSection) {
          // Mark lesson as completed
          setCurrentSectionIndex(sections.length); // This triggers the "lesson completed" condition
          setFeedback("");
          setUserInput("");
          completeLesson(courseNr);
        } else {
          // Move to the next section
          setCurrentSectionIndex((prev) => prev + 1);
          setCurrentContentIndex(0);
          setUserInput("");
          setFeedback("");
          setScrollTrigger(true); // Trigger scroll
        }
      }, 700);
    } else {
      setFeedback("Try again.");
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      {/* <h1 className="text-3xl font-bold mb-6 mt-4">{title}</h1> */}
      <LessonContent
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        currentContentIndex={currentContentIndex}
        completedSections={completedSections}
        feedback={feedback}
        userInput={userInput}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        setUserInput={setUserInput}
        isAnimating={isAnimating}
        lessonsOverviewUrl={lessonsOverviewUrl}
      />
    </div>
  );
}
