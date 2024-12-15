import { useState, useRef, useEffect } from "react";

interface Section {
  id: number; // Unique identifier for the section
  content: string[]; // Array of instructional text pieces
  question: string; // Question for the user
  answer: string; // Correct answer
  sectionTitle: string; // Title of the section
}

interface LessonProps {
  title: string; // Title of the lesson
  sections: Section[]; // Array of sections
}

export default function Lessons({ title, sections }: LessonProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completedSections, setCompletedSections] = useState<Section[]>([]);
  const currentSectionRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Automatically scroll to the latest content or question
  useEffect(() => {
    if (currentSectionRef.current) {
      currentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentContentIndex, currentSectionIndex]);

  const handleNext = () => {
    const section = sections[currentSectionIndex];

    // If there is more content in the current section, show it
    if (currentContentIndex < section.content.length - 1) {
      setCurrentContentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    const section = sections[currentSectionIndex];

    if (
      userInput.trim().toLowerCase() === section.answer.trim().toLowerCase()
    ) {
      setFeedback("Correct!");

      // Mark the section as completed with its content up to the current point
      setCompletedSections((prev) => [
        ...prev,
        {
          ...section,
          content: section.content.slice(0, currentContentIndex + 1),
        },
      ]);

      setUserInput("");
      setFeedback("");

      // Move to the next section immediately
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentContentIndex(0); // Reset content index for the new section
    } else {
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
      setFeedback("Wrong. Try again.");
    }
  };

  const isLessonCompleted = currentSectionIndex >= sections.length;

  return (
    <div className="flex flex-col justify-center items-center p-4">
      {/* Lesson Title */}
      <h1 className="text-3xl font-bold mb-6 mt-4">{title}</h1>

      {/* Completed Sections */}
      <div className="w-full max-w-2xl p-4 rounded-lg mb-6">
        <div className="flex flex-col gap-4">
          {completedSections.map((section) => (
            <div
              key={section.id}
              className="p-3 rounded-lg border-2 border-gray-500 dark:text-gray-500 text-gray-500"
            >
              <h3 className="font-bold text-lg">{section.sectionTitle}</h3>
              {section.content.map((text, idx) => (
                <p key={idx} className="text-sm mt-1">
                  {text}
                </p>
              ))}
              <p className="font-semibold mt-2">{section.question}</p>
              <p className="text-green-600 font-bold mt-1">
                Your Answer: {section.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Section */}
      {!isLessonCompleted && (
        <div
          ref={currentSectionRef}
          className="w-full max-w-2xl p-2 rounded-lg mb-[10rem]"
        >
          <h2 className="text-xl font-semibold mb-4">
            {sections[currentSectionIndex].sectionTitle}
          </h2>
          {/* Show content up to the current index */}
          {sections[currentSectionIndex].content
            .slice(0, currentContentIndex + 1)
            .map((text, idx) => (
              <p key={idx} className="mb-4 text-sm">
                {text}
              </p>
            ))}
          {currentContentIndex ===
            sections[currentSectionIndex].content.length - 1 && (
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
                <p
                  className={`mt-2 font-bold ${
                    feedback === "Correct!"
                      ? "text-green-600"
                      : `text-red-600  ${isAnimating ? "animate-bounce" : ""}`
                  }`}
                >
                  {feedback}
                </p>
              )}
            </>
          )}
          {currentContentIndex <
            sections[currentSectionIndex].content.length - 1 && (
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
        <div className="w-full max-w-2xl dark:bg-base-100 bg-green-100 p-4 rounded-lg shadow-md text-center mb-[10rem]">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Congratulations!
          </h2>
          <p className="text-lg">You’ve completed the lesson.</p>
        </div>
      )}
    </div>
  );
}
