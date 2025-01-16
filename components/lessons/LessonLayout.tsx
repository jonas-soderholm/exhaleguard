import React from "react";
import Image from "next/image";
import "./lesson.css";
import Link from "next/link";

export interface Section {
  id: number;
  content: string[];
  question: string;
  answerKeywords: string[];
  sectionTitle: string;
  images?: string[];
}

export interface LessonProps {
  lessonsOverviewUrl: string;
  sections: Section[];
}

interface LessonContentProps {
  sections: Section[];
  currentSectionIndex: number;
  currentContentIndex: number;
  completedSections: Section[];
  feedback: string;
  userInput: string;
  isAnimating: boolean; // Add this property
  handleNext: () => void;
  handleSubmit: () => void;
  setUserInput: (value: string) => void;
  lessonsOverviewUrl: string;
}

const LessonContent: React.FC<LessonContentProps> = ({
  sections,
  currentSectionIndex,
  currentContentIndex,
  completedSections,
  feedback,
  userInput,
  isAnimating,
  lessonsOverviewUrl,
  handleNext,
  handleSubmit,
  setUserInput,
}) => {
  const isLessonCompleted = currentSectionIndex >= sections.length;

  return (
    <>
      {/* Completed Sections */}
      <div className="w-full max-w-2xl p-4 rounded-lg mb-6">
        <div className="flex flex-col gap-4">
          {completedSections.map((section) => (
            <div
              key={section.id}
              className="p-3 rounded-lg border-2 border-gray-500 dark:text-gray-500 text-gray-500"
            >
              <h3 className="font-bold text-lg">{section.sectionTitle}</h3>
              {section.content.map((text: string, index: number) => (
                <div key={index} className="mt-1">
                  {section.images && section.images[index] && (
                    <img
                      src={section.images[index]}
                      alt={`Image for ${text}`}
                      className="mt-2 rounded-lg max-w-full mx-auto"
                    />
                  )}
                  <p className="text-sm">{text}</p>
                </div>
              ))}
              <p className="font-semibold mt-2">{section.question}</p>
              <p className="text-green-600 font-bold mt-1 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-green-500"
                >
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                  <g transform="translate(0, 2)">
                    <path
                      d="M16.53 8.53a.75.75 0 0 0-1.06-1.06L10 12.94l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6-6z"
                      fill="white"
                    />
                  </g>
                </svg>
                <div className="flex flex-wrap items-center gap-2">
                  {section.answerKeywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="bg-slate-600 text-green-500 px-2 rounded-md text-xs"
                    >
                      {keyword}
                    </div>
                  ))}
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Section */}
      {!isLessonCompleted && (
        <div className="w-full max-w-2xl p-2 rounded-lg mb-[5rem]">
          <h2 className="text-xl font-semibold mb-4">
            {sections[currentSectionIndex].sectionTitle}
          </h2>
          {sections[currentSectionIndex].content
            .slice(0, currentContentIndex + 1)
            .map((text, index) => (
              <div key={index} className="mb-4">
                {sections[currentSectionIndex].images &&
                  sections[currentSectionIndex].images[index] && (
                    <img
                      src={sections[currentSectionIndex].images[index]}
                      alt={`Image for ${text}`}
                      className="mt-2 rounded-lg max-w-full mx-auto"
                    />
                  )}
                <p className=" animate-fade-in">{text}</p>
              </div>
            ))}
          {currentContentIndex ===
          sections[currentSectionIndex].content.length - 1 ? (
            <>
              <p className="font-semibold mb-2">
                {sections[currentSectionIndex].question}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Your answer"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
              {feedback && (
                <div
                  className={`flex items-center gap-2 mt-2 font-bold ${
                    feedback === "Correct!"
                      ? "text-green-600"
                      : `text-red-600 ${isAnimating ? "animate-bounce" : ""}`
                  }`}
                >
                  {feedback === "Correct!" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6 text-green-500"
                      >
                        <circle cx="12" cy="12" r="10" fill="currentColor" />
                        <g transform="translate(0, 2)">
                          {" "}
                          {/* Moves the checkmark down by 2 units */}
                          <path
                            d="M16.53 8.53a.75.75 0 0 0-1.06-1.06L10 12.94l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6-6z"
                            fill="white"
                          />
                        </g>
                      </svg>

                      <span>{feedback}</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6 text-red-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.25a1 1 0 112 0 1 1 0 01-2 0zM10 7a1 1 0 011 1v3a1 1 0 01-2 0V8a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feedback}</span>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <button
              onClick={handleNext}
              className="mt-4 bg-gray-500 text-white p-2 rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      )}

      {/* Lesson Completed */}
      {isLessonCompleted && (
        <div className="  p-4 rounded-lg text-center mb-[10rem]">
          <h2 className="text-3xl">🥳</h2>
          <h2 className="text-3xl font-bold text-green-600 my-2">
            Congratulations!
          </h2>
          <p className="text-lg">You’ve completed the lesson.</p>
          <Link href={lessonsOverviewUrl}>
            <button className="btn-custom-primary-reverse mt-4">
              Back For More Lessons
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default LessonContent;
