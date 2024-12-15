import CourseCard from "./CourseCard";

export default async function AllCourses() {
  // Array of course data
  const courses = [
    {
      title: "Cybersecurity Basics 1.0",
      description:
        "Learn the fundamentals of cybersecurity in this beginner-friendly course.",
      buttonText: "5 free lessons",
      active: true,
      image: "/images/courses-backgrounds/basic1.jpg",
      value: 50,
      linkUrl: "/courses/cybersecurity-basics-1",
    },
    {
      title: "Cybersecurity Basics 2.0",
      description:
        "Expand on the basics with more advanced topics and interactive exercises.",
      buttonText: "Subscription needed",
      image: "/images/courses-backgrounds/basic1.jpg",
      value: 50,
      linkUrl: "/sign-up",
    },
    {
      title: "Privacy Basics",
      description:
        "Understand privacy principles and how to protect your personal data.",
      buttonText: "Subscription needed",
      image: "/images/courses-backgrounds/basic1.jpg",
      value: 50,
      linkUrl: "/sign-up",
    },
    {
      title: "Cybersecurity Frameworks and Third-Party Risk Management",
      description:
        "Explore frameworks and strategies for managing third-party cybersecurity risks.",
      buttonText: "Subscription needed",
      image: "/images/courses-backgrounds/basic1.jpg",
      value: 50,
      linkUrl: "/sign-up",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">Courses</h1>

      {/* Centered Button */}
      <div className="flex justify-center mb-6">
        <button className="btn-custom-primary-reverse">
          Subscribe To Unlock All Courses
        </button>
      </div>

      {/* Wrapper for consistent spacing */}
      <div className="flex flex-col items-center px-4">
        {courses.map((course, index) => (
          <div key={index}>
            {/* Course Card */}
            <div className="flex items-center flex-row justify-center md:gap-8">
              <CourseCard
                title={course.title}
                description={course.description}
                buttonText={course.buttonText}
                image={course.image}
                value={course.value}
                linkUrl={course.linkUrl}
              />
            </div>

            {/* Divider */}
            {index < courses.length - 1 && (
              <div className="divider w-[80%] sm:w-[70%] md:w-[60%] mx-auto"></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
