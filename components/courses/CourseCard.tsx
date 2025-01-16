import ProgressBar from "./ProgressBar";

type CourseCardProps = {
  title: string;
  courseNr: number;
  lessonAmount: number;
  description: string;
  buttonText: string;
  image: string;
  linkUrl: string;
  progress: number; // Include progress prop
  onClick?: () => void;
};

export default function CourseCard({
  title,
  description,
  image,
  buttonText,
  linkUrl,
  progress, // Destructure progress
  onClick,
}: CourseCardProps) {
  return (
    <div className="relative w-full sm:w-[30rem] md:w-[35rem] lg:w-[35rem] overflow-hidden rounded-lg mb-6">
      {/* Image */}
      <img
        src={image}
        alt="Course image"
        className="w-full h-[12rem] object-cover"
      />
      <div className="absolute inset-0 bg-[#000000] bg-opacity-85"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-3">
        <div>
          <h1 className="text-lg md:text-[1.5rem] text-slate-200 font-bold max-w-[16rem] md:max-w-[30rem] ">
            {title}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm mt-2 max-w-[18.5rem] sm:max-w-[25rem] md:max-w-[27rem]">
            {description}
          </p>
        </div>

        <a href={linkUrl}>
          <button onClick={onClick} className="btn-custom-primary-course">
            {buttonText}
          </button>
        </a>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-2 right-2">
        <ProgressBar progressValue={progress} />
      </div>
    </div>
  );
}
