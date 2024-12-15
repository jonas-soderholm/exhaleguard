import Link from "next/link";

type CourseCardProps = {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  value: number;
  linkUrl: string;
};

export default function CourseCard({
  title,
  description,
  image,
  value,
  buttonText,
  linkUrl,
}: CourseCardProps) {
  return (
    <div className="relative w-full sm:w-[30rem] md:w-[35rem] lg:w-[35rem] overflow-hidden rounded-lg">
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
          <p className="text-slate-200 text-xs sm:text-sm mt-2 max-w-[27rem]">
            {description}
          </p>
        </div>

        <Link href={linkUrl}>
          <button className="btn-custom-primary-course">{buttonText}</button>
        </Link>
      </div>

      {/* Progress Indicator */}
      <div
        className="radial-progress absolute text-[12px] sm:text-[12px] bg-secondary top-2 right-2"
        style={
          {
            "--value": value,
            "--size": "2rem",
            "--thickness": "4px",
          } as React.CSSProperties
        }
        role="progressbar"
      >
        {value}%
      </div>
    </div>
  );
}
