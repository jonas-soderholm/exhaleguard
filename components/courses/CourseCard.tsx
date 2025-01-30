"use client";

import { isSubscribedNew } from "@/utils/user-actions/subscription";
import { getUserId } from "@/utils/user-actions/get-user";
import ProgressBar from "./ProgressBar";

type CourseCardProps = {
  title: string;
  courseNr: number;
  lessonAmount: number;
  description: string;
  buttonText: string;
  image: string;
  linkUrl: string;
  progress: number;
};

export default function CourseCard({
  title,
  description,
  buttonText,
  image,
  linkUrl,
  progress,
}: CourseCardProps) {
  const handleCourseClick = async () => {
    try {
      // Check if user is logged in first
      const userId = await getUserId(); // If not authenticated, this will throw

      // If getUserId() fails, catch the error and redirect
      if (!userId) {
        console.error("User not authenticated");
        window.location.href = "/sign-up";
        return;
      }

      // Now check subscription status
      const subscribed = await isSubscribedNew(userId);

      if (!subscribed) {
        window.location.href = "/account?tab=1"; // Redirect to subscription page
        return;
      }

      // Navigate to the course page (let it handle progress)
      window.location.href = linkUrl;
    } catch (error) {
      console.error("Error handling course click:", error);
    }
  };

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

        <button
          onClick={handleCourseClick}
          className="btn-custom-primary-course w-[10rem]"
        >
          {buttonText}
        </button>
      </div>

      {/* Progress */}
      <div className="absolute top-2 right-2">
        <ProgressBar progressValue={progress} />
      </div>
    </div>
  );
}
