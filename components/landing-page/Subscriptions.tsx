import { Prices } from "@/app/constants/prices";
import Link from "next/link";

export default function Subscriptions() {
  const subscriptions = [
    {
      title: "Free",
      description:
        "5 Lessons for free. Try them out and see if XhaleGuard is for you.",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      active: true,
      price: Prices.Free,
      buttontext: "Try 5 Free Lessons Now",
      route: "/courses",
    },
    {
      title: "Personal",
      description: "All current and upcoming courses included.",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      active: true,
      price: Prices.Individual,
      buttontext: "Subscribe",
      route: "/subscribe",
    },
    {
      title: "Team (Coming Soon)",
      description: `Invite team members and track their course progression. ${Prices.Team} per seat.`,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      active: false,
      price: Prices.Team,
      buttontext: "Coming Soon",
      route: "/subscribe",
    },
  ];

  return (
    <>
      <div className="flex justify-center mx-auto font-bold text-3xl mb-14 mt-[10rem]">
        ExhaleGuard Course Pricing
      </div>

      <div className="flex flex-wrap justify-center max-w-[80rem] mx-auto px-4 gap-8 text-slate-200">
        {subscriptions.map((subscription, index) => (
          <div
            key={index}
            className={`card bg-base-100 md:w-72 w-full max-w-xs ${!subscription.active ? "opacity-50" : ""} rounded-lg`}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title mb-5">{subscription.title}</h2>
              <div className="price">
                <div className="my-5 text-[4rem] font-bold">
                  {subscription.price}$<span className="text-sm">/mo</span>
                </div>
              </div>

              <p>{subscription.description}</p>
              <div className="card-actions">
                {subscription.active ? (
                  <Link
                    href={subscription.route}
                    aria-label="View free cybersecurity lessons"
                  >
                    <button className="btn-custom-primary-reverse mt-6 hover:bg-blue-500">
                      {subscription.buttontext}
                    </button>
                  </Link>
                ) : (
                  <button className="btn btn-disabled" disabled>
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
