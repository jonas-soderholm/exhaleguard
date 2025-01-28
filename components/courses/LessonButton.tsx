import Link from "next/link";

type Lesson = {
  lessonName: string;
  link: string;
  disabled?: boolean;
  done?: boolean;
  onClick?: () => void; // Add an optional onClick prop
};

export function LessonButton({
  lessonName,
  link,
  disabled,
  done,
  onClick,
}: Lesson) {
  return (
    <div>
      {disabled ? (
        <button
          className={`btn-custom-primary-lesson !bg-gray-800 !text-gray-600 cursor-not-allowed`}
          style={{ pointerEvents: "none" }}
          disabled
        >
          {lessonName}
        </button>
      ) : (
        <Link href={link}>
          <button
            className={`btn-custom-primary-lesson hover:border-transparent  ${
              done ? "!bg-gray-500  !text-gray-400" : ""
            }`}
            onClick={onClick} // Attach the click handler
          >
            {lessonName}
          </button>
        </Link>
      )}
    </div>
  );
}
