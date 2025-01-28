"use client";

import { useState, useEffect } from "react";
import { LessonProps, Section } from "./LessonLayout";
import LessonContent from "./LessonLayout";
import LessonLoaderVisual from "./LessonLoaderVisual";
import {
  updateLessonNr,
  updateSectionNr,
  getSectionNr,
  getLessonNr,
  resetSectionNr,
} from "@/utils/course-progression/course-progression-actions";

export default function LessonEngine({
  sections,
  lessonsOverviewUrl,
  courseNr,
  currentLessonIndex,
}: LessonProps & {
  courseNr: number;
  currentLessonIndex: number;
}) {
  const [completedSections, setCompletedSections] = useState<Section[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollDown = (amount: number) => {
    window.scrollBy({ top: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        let lessonNrFromDB = await getLessonNr(courseNr); // Fetch lessonNr from DB
        let sectionNr = 0;

        if (currentLessonIndex < lessonNrFromDB) {
          sectionNr = 1000;
        } else {
          sectionNr = await getSectionNr(courseNr); // Fetch sectionNr from DB
        }

        console.log("Lesson from DB:", lessonNrFromDB);
        console.log("Section from DB:", sectionNr);

        setCurrentSectionIndex(sectionNr); // Set progress
        setCompletedSections(sections.slice(0, sectionNr)); // Mark sections as completed
      } catch (error) {
        console.error(`Error fetching progress for course ${courseNr}:`, error);
      }
    };

    fetchProgress();
  }, [courseNr, sections]);

  const handleNext = () => {
    const section = sections[currentSectionIndex];

    setTimeout(() => {
      scrollDown(250);
    }, 100);

    if (currentContentIndex < section.content.length - 1) {
      setCurrentContentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const currentSection = sections[currentSectionIndex];
    const userInputNormalized = userInput.trim().toLowerCase();
    const isAnswerCorrect = currentSection.answerKeywords.some((keyword) =>
      userInputNormalized.includes(keyword.trim().toLowerCase())
    );

    if (isAnswerCorrect) {
      setFeedback("Correct!");
      updateSectionNr(courseNr);

      setTimeout(() => {
        const isLastSection = currentSectionIndex === sections.length - 1;

        setCompletedSections((prev) => {
          if (!prev.find((section) => section.id === currentSection.id)) {
            return [
              ...prev,
              {
                ...currentSection,
                content: currentSection.content.slice(
                  0,
                  currentContentIndex + 1
                ),
              },
            ];
          }
          return prev;
        });

        if (isLastSection) {
          setCurrentSectionIndex(sections.length);
          setFeedback("");
          setUserInput("");
          resetSectionNr(courseNr);
          updateLessonNr(courseNr);
        } else {
          setCurrentSectionIndex((prev) => prev + 1);
          setCurrentContentIndex(0);
          setUserInput("");
          setFeedback("");
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
      <LessonLoaderVisual>
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
      </LessonLoaderVisual>
    </div>
  );
}
