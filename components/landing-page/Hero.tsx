"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section
        aria-labelledby="main-heading"
        className="flex p-10 md:p-24 gap-4 text-slate-200 bg-exhaleguard-primary py-8 md:py-12"
      >
        <div>
          <h1
            id="main-heading"
            className="text-[2rem] sm:text-[3rem] font-bold mb-4 max-w-[50rem]"
          >
            Cybersecurity And Privicy Awareness Training.
          </h1>

          <p className="text-[1rem] mb-8 max-w-[35rem]">
            Structured, beginner-friendly, interactive courses for daily users,
            team members, and executives to cover the fundamentals of
            cybersecurity and privacy.
          </p>

          <Link href="/courses" aria-label="View free cybersecurity lessons">
            <button
              className="btn-custom-primary"
              aria-label="Try 5 free cybersecurity lessons"
            >
              Try 5 Free Lessons Now
            </button>
          </Link>

          <p className="mt-3 text-slate-400 text-sm">
            No credit card required.
          </p>
          {/* <p className="text-slate-400 text-sm">
            Full access - {Prices.Individual}/mo.
          </p> */}
        </div>

        <div className="justify-center items-center h-[500px] hidden xl:flex">
          <img
            src="./images/hero/device-mockup.png"
            alt="Cybersecurity course background promoting basic cybersecurity training"
            loading="lazy"
            className="w-auto h-auto max-w-full max-h-full object-contain"
          />
        </div>
      </section>
    </>
  );
}
