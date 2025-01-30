"use client";

import { useState, useEffect, useRef } from "react";
import { LessonProps, Section } from "./LessonLayout";
import LessonContent from "./LessonLayout";
import LessonLoaderVisual from "./LessonLoaderVisual";
import {
  updateLessonNr,
  updateSectionNr,
  resetSectionNr,
  getProgress,
} from "@/utils/course-progression/course-progression-actions";
import { getUserId } from "@/utils/user-actions/get-user";

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

  // useEffect(() => {
  //   const fetchProgress = async () => {
  //     const userId = await getUserId();

  //     try {
  //       const lessonNrFromDB = await getLessonNr(courseNr, userId);
  //       const sectionNrFromDB = await getSectionNr(courseNr, userId); // Fetch lesson number
  //       console.log("lessonNrFromDB", lessonNrFromDB); // Log lessonNrFromDB to verify

  //       let sectionNr = 0;

  //       if (currentLessonIndex < lessonNrFromDB) {
  //         sectionNr = 1000;
  //       } else {
  //         sectionNr = sectionNrFromDB; // Adjust as necessary
  //       }

  //       console.log("sectionNr (before state update):", sectionNr); // Log before updating state

  //       setCurrentSectionIndex(sectionNr); // Set progress
  //       setCompletedSections(sections.slice(0, sectionNr)); // Mark sections as completed
  //     } catch (error) {
  //       console.error(`Error fetching progress for course ${courseNr}:`, error);
  //     }
  //   };

  //   fetchProgress();
  // }, []); // Trigger when courseNr, sections, or userId changes

  const hasFetched = useRef(false); // Track if data has already been fetched
  useEffect(() => {
    if (hasFetched.current) return; // Stop duplicate fetches
    hasFetched.current = true;

    const fetchProgress = async () => {
      const userId = await getUserId();
      if (!userId) return;

      try {
        const lessonNrFromDB = await getProgress(courseNr, userId); // Fetch lesson number
        console.log("lessonNrFromDB", lessonNrFromDB); // Log lessonNrFromDB to verify

        let sectionNr = 0;

        if (currentLessonIndex < lessonNrFromDB.lessonNr) {
          sectionNr = 1000;
        } else {
          sectionNr = lessonNrFromDB.sectionNr; // Adjust as necessary
        }

        console.log("sectionNr (before state update):", sectionNr); // Log before updating state

        setCurrentSectionIndex(sectionNr); // Set progress
        setCompletedSections(sections.slice(0, sectionNr)); // Mark sections as completed
      } catch (error) {
        console.error(`Error fetching progress for course ${courseNr}:`, error);
      }
    };

    fetchProgress();
  }, [courseNr, currentLessonIndex, sections]);

  useEffect(() => {
    // Log currentSectionIndex after it updates
    console.log(
      "Updated sectionNr (currentSectionIndex):",
      currentSectionIndex
    );
  }, [currentSectionIndex]); // This will log when currentSectionIndex is updated

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
    const userId = await getUserId();

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
          resetSectionNr(courseNr, userId);
          updateLessonNr(courseNr, userId);
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
