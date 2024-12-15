import React from "react";

type LessonBoxProps = {
  children: React.ReactNode;
  isSubscribed?: boolean; // Renamed to indicate subscription status
  overlayImage?: string; // Add a prop for the overlay image
};

export default function LessonBox({
  children,
  isSubscribed = false, // Default to false if not provided
  overlayImage,
}: LessonBoxProps) {
  return (
    <div className="relative flex justify-center md:min-w-[50rem] bg-base-100 rounded-lg">
      {/* Show overlay if user is not subscribed */}
      {!isSubscribed && (
        <>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-100 z-40  rounded-lg"></div>
          {/* Overlay image and subscription text */}
          {overlayImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
              <img
                src={overlayImage}
                alt="Overlay"
                className="object-cover w-24"
              />
              <div className="mt-2 text-xl font-bold">Subscription Needed</div>
            </div>
          )}
        </>
      )}
      <div className="rounded-lg p-8 flex flex-col gap-8 z-30 md:min-w-[50rem]">
        {children}
      </div>
    </div>
  );
}
