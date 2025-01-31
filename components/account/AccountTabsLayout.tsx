"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AccountTabsLayout({
  menuItems,
}: {
  menuItems: { name: string; content: React.ReactNode }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeIndexParam = searchParams.get("tab");

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndexParam !== null) {
      // Update the state based on the query parameter
      const parsedIndex = parseInt(activeIndexParam, 10);
      if (!isNaN(parsedIndex)) {
        setActiveIndex(parsedIndex); // Ensure the correct tab is selected
      }
    }
  }, [activeIndexParam]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index); // Update the active tab state
    router.replace(`/account?tab=${index}`); // Update the URL to reflect the active tab
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 w-full max-w-lg">
        {menuItems.map((item, index) => (
          <button
            key={index}
            role="tab"
            onClick={() => handleTabClick(index)} // Change the tab and update the URL
            className={`px-4 py-2 text-sm font-medium ${
              activeIndex === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl mt-6 rounded-lg p-6 border border-gray-400">
        {/* <h1 className="text-lg font-bold mb-4">
          {menuItems[activeIndex].name}
        </h1> */}
        <div className="text-sm">{menuItems[activeIndex].content}</div>
      </div>
    </div>
  );
}
