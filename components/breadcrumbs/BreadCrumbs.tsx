"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  // Skip rendering breadcrumbs if on the home page
  if (pathname === "/") {
    return null;
  }

  const breadcrumbArray = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    return {
      label: path.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase()), // Capitalize first letter only
      href: href,
    };
  });

  return (
    <div className="breadcrumbs text-[9px] md:text-xs fixed top-0 left-0 w-full z-50 bg-transparent px-4 py-2 mt-[4rem]">
      <ul className="flex flex-wrap space-x-2">
        <li>
          <Link href="/" className="dark:text-gray-300 hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbArray.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && <span className="text-gray-400"></span>}
            <Link
              href={crumb.href}
              className="dark:text-gray-300 hover:underline"
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
