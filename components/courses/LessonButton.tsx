import Link from "next/link";

type Lesson = {
  lessonName: string;
  link: string;
  disabled?: boolean; // Optional disabled prop
  done?: boolean; // Optional done prop
};

export function LessonButton({ lessonName, link, disabled, done }: Lesson) {
  return (
    <div>
      {disabled ? (
        // Render a disabled button without a Link wrapper
        <button
          className={`btn-custom-primary-lesson !bg-gray-800 !text-gray-600 cursor-not-allowed`}
          style={{ pointerEvents: "none" }}
          disabled
        >
          {lessonName}
        </button>
      ) : (
        // Render an enabled button with the Link wrapper
        <Link href={link}>
          <button
            className={`btn-custom-primary-lesson hover:border-transparent ${
              done ? "!bg-gray-500  !text-gray-400" : ""
            }`}
          >
            {lessonName}
          </button>
        </Link>
      )}
    </div>
  );
}
