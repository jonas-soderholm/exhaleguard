"use client";
import { Prices } from "@/constants/prices";
import { createCheckoutSession } from "@/utils/stripe/stripe-actions";

type IndividualPlanProps = {
  email: string | null;
  subscribed: boolean;
  daysLeft: number | null;
};

const KeySvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="48px"
    viewBox="0 -960 960 960"
    width="48px"
    fill="#2563EB"
  >
    <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
  </svg>
);

export default function IndividualPlan({
  subscribed,
  daysLeft,
}: IndividualPlanProps) {
  const handleCheckout = async () => {
    try {
      const checkoutUrl = await createCheckoutSession();

      if (checkoutUrl) {
        window.location.href = checkoutUrl; // Redirect to Stripe Checkout
      } else {
        alert("Failed to create a Stripe Checkout session.");
      }
    } catch (error) {
      console.error("Error creating Stripe Checkout session:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto">
      {!subscribed ? (
        <div>
          <div className="flex items-center mb-2 space-x-2">
            <KeySvg />
            <span className="text-xl font-bold">Individual plan</span>
            <h2 className="text-lg font-semibold text-green-600">(Active)</h2>
          </div>
          <p className="text-base mb-1">
            You have{" "}
            <span className="font-semibold text-green-600">
              {daysLeft} days
            </span>{" "}
            remaining on your Individual Plan.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-2 space-x-2">
            <KeySvg />
            <span className="text-xl font-bold">Individual plan</span>
            <h2 className="text-lg font-semibold text-red-600">(Inactive)</h2>
          </div>
          <p className="text-base">
            Unlock all courses with an Individual Plan. One time payment, no
            automatic renewals. Access for 1 month.
          </p>
          <div className="border-t border-gray-400 mt-4 pt-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Billing Settings</h3>
              <p className="text-base text-gray-500">
                You are logged in as{" "}
                <span className="font-semibold text-gray-500">
                  jonas.soderholm89@gmail.com
                </span>
                .
              </p>
              <p className="text-sm text-gray-500"></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-400 p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-lg mb-2">One time Payment</h4>
                <p className="text-base">Individual Plan</p>
                <p className="text-xl font-semibold mt-2">
                  ${Prices.Individual}.00
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Gives you access for 1 month. No subscription, and no
                  automatic renewals.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-400 pt-4">
              <div>
                <p className="text-sm text-gray-500">One time payment</p>
                <p className="text-xl font-semibold">
                  ${Prices.Individual}.00 USD
                </p>
              </div>
              <div>
                <div className="mt-2">
                  <button
                    onClick={() => handleCheckout()}
                    className="bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-semibold transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                  >
                    Secure Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <p>Powered by </p>
              <img
                src="/images/stripe/stripe-logo.png"
                alt="Powered by Stripe"
                className="w-16"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
