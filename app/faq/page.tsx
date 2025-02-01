const faq = [
  {
    question: "Why do you offer one-time payments instead of subscriptions?",
    answer:
      "Right now, our courses are designed to be completed within a month, ensuring you get full value from your access. We believe in ethical billing—one-time payments ensure you won't be charged unexpectedly. As our platform grows and we offer more content, we may introduce optional subscriptions in the future.",
  },
  {
    question: "Can I gift access to friends and coworkers?",
    answer:
      "Yes! With the team plan in your account, you can add up to 10 members per purchase. If you need more, simply make additional purchases. Team plans come at a discounted rate, making it the most simple and cost-effective way to provide access.",
  },
  {
    question: "Are your courses beginner-friendly?",
    answer:
      "Yes! Our cybersecurity courses cover everything from the basics to advanced techniques. Whether you're a complete beginner or looking to sharpen your skills, we have structured content to guide you step by step.",
  },
  {
    question: "Do I get lifetime access to the course?",
    answer:
      "No, each purchase grants access for one month. This ensures the content stays relevant and up-to-date as cybersecurity threats evolve. If you need more time, you can always renew your access with another one-time payment.",
  },
  {
    question: "What topics are covered in your courses?",
    answer:
      "Our courses cover essential cybersecurity topics, including ethical hacking, penetration testing, network security, threat analysis, and more. We focus on practical, real-world skills to help you defend against modern threats.",
  },
  {
    question: "Is there a certificate upon completion?",
    answer:
      "Yes! Upon completing a course, you'll receive a certificate that you can add to your resume or LinkedIn profile to showcase your cybersecurity expertise.",
  },
  {
    question: "What is your technology stack?",
    answer:
      "Our frontend and backend are both written in TypeScript. The frontend is built with Next.js and React, while the backend runs on Node.js with a PostgreSQL database. We use Prisma for database management and Supabase for authentication.",
  },
];

function FAQPage() {
  return (
    <>
      <header className="text-4xl text-center mt-2 mb-6 font-bold ">FAQ</header>
      <div className="flex justify-center mx-4">
        <div className="join join-vertical w-full max-w-2xl bg-base-400 text-slate-300">
          {faq.map((item, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-200 mb-2"
            >
              <input type="radio" name="my-accordion-1" id={`faq-${index}`} />
              <label
                htmlFor={`faq-${index}`}
                className="collapse-title text-lg font-bold cursor-pointer"
              >
                {item.question}
              </label>
              <div className="collapse-content text-sm">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FAQPage;
