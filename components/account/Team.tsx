"use client";
import { createCheckoutSession } from "@/utils/stripe/stripe-actions";
import { LogoName } from "@/constants/logo-name";
import { useState, useEffect } from "react";
import { Prices } from "@/constants/prices";

export const handleCheckoutTeam = async () => {
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

export default function Team() {
  const [teamEmails, setTeamEmails] = useState<string[]>([]);
  const [currentEmailInput, setCurrentEmailInput] = useState<string>(""); // Separate state for input field
  const [alert, setAlert] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tooManyMembers, setTooManyMembers] = useState<string | null>(null);
  const [checkoutDisabled, setCheckoutDisabled] = useState<boolean>(true);
  const maxEmails = 3;
  const minimumEmails = 2;
  const alertTimeoutShort = 2500;
  const alertTimeoutLong = 7000;
  let totalAmountToPay = Prices.Team * teamEmails.length;

  useEffect(() => {
    setCheckoutDisabled(teamEmails.length < minimumEmails);
  }, [teamEmails]);

  useEffect(() => {
    if (success) {
      setAlert(null);
      setTooManyMembers(null);
      const timer = setTimeout(() => setSuccess(null), alertTimeoutShort);
      return () => clearTimeout(timer); // Cleanup to prevent memory leaks
    }
  }, [success]);

  useEffect(() => {
    if (alert) {
      setSuccess(null);
      setTooManyMembers(null);
      const timer = setTimeout(() => setAlert(null), alertTimeoutShort);
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [alert]);

  useEffect(() => {
    if (tooManyMembers) {
      setSuccess(null);
      setAlert(null);
      const timer = setTimeout(() => setTooManyMembers(null), alertTimeoutLong);
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [tooManyMembers]);

  const addEmail = (email: string) => {
    if (teamEmails.length >= maxEmails) {
      setTooManyMembers(
        `⚠️ You can add up to ${maxEmails} seats per team invitation. To invite more than ${maxEmails} people, please make an additional purchase.`
      );
      setAlert(null);
      setSuccess(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

    if (!emailRegex.test(email)) {
      setAlert("⚠️ Please enter a valid email address.");
      setSuccess(null);
      return;
    }

    if (email.trim() === "") {
      setAlert("⚠️ Email cannot be empty.");
      setSuccess(null);
      return;
    }

    if (teamEmails.includes(email)) {
      setAlert("⚠️ This email has already been added.");
      setSuccess(null);
      return;
    }

    setTeamEmails([...teamEmails, email]);
    setCurrentEmailInput(""); // Clear input after adding
    setAlert(null);
    setSuccess("✅ Email added successfully!"); // Success feedback
  };

  const removeEmail = (index: number) => {
    setTeamEmails(teamEmails.filter((_, i) => i !== index));
    setAlert("");
    setAlert("User removed successfully.");
    if (teamEmails.length < maxEmails) {
      setCheckoutDisabled(true);
    }
  };

  const handleAddEmail = () => {
    addEmail(currentEmailInput);
  };

  return (
    <>
      <div className="flex items-center mb-4 space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#2563EB"
        >
          <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
        </svg>
        <span className="text-xl font-bold">
          Invite Team Members ({Prices.Team}$ / Seat)
        </span>
      </div>
      <p className="text-xs text-gray-500 ">
        If the added emails are not currently registered on {LogoName.AppName},
        an account will be created, and an invitation will be sent to the user
        to log in. Additionally, they will be subscribed to an individual plan
        for one month.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <p>Up to {maxEmails} team members for each invitation</p>
        <form
          onSubmit={(e) => e.preventDefault()} // Prevent page reload
          className="flex flex-col items-center gap-2 w-full max-w-md"
        >
          <div className="w-full">
            <input
              type="text"
              value={currentEmailInput}
              onChange={(e) => setCurrentEmailInput(e.target.value)}
              className="input text-slate-200 input-bordered w-full text-center"
              placeholder="Enter email"
            />
          </div>
          <button
            type="button"
            onClick={handleAddEmail}
            className="bg-transparent w-full py-2 rounded-md text-md font-semibold border border-gray-600 
            hover:bg-green-400 hover:text-white hover:border-transparent transition-all"
          >
            Add Email
          </button>
        </form>
        <div className="h-2 mb-2">
          {alert && <p className="text-red-500 text-xs">{alert}</p>}
          {success && <p className="text-green-500 text-xs">{success}</p>}
          {tooManyMembers && (
            <p className="text-red-500 text-xs">{tooManyMembers}</p>
          )}
        </div>
      </div>

      <div className="overflow-x-auto w-full flex justify-center">
        <table className="table mx-auto w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teamEmails.length > 0 ? (
              teamEmails.map((email, index) => (
                <tr key={index} className="animate-fade-in">
                  <th>{index + 1}</th>
                  <td>{email}</td>
                  <td>
                    <button
                      onClick={() => removeEmail(index)}
                      className="bg-transparent w-full p-1 rounded-md text-xs border border-gray-600 hover:bg-red-400 hover:text-white hover:border-transparent transition-all"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 py-4">
                  No emails added yet. Start by adding one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex items-center justify-between border-t border-gray-400 pt-4">
          <div>
            <p className="text-sm text-gray-500">One time payment</p>
            <p className="text-xl font-semibold">${totalAmountToPay}.00 USD</p>
          </div>
          <div>
            <div className="mt-2">
              <button
                // onClick={() => handleCheckout()}
                disabled={checkoutDisabled}
                data-tip={
                  checkoutDisabled
                    ? `Please add at least ${minimumEmails} seats to proceed.`
                    : null
                }
                className={
                  "tooltip tooltip-bottom text-white py-3 px-6 rounded-md text-lg font-semibold transition-all" +
                  (checkoutDisabled
                    ? "hover:bg-gray-400 bg-gray-400 cursor-not-allowed"
                    : "hover:bg-blue-700 bg-blue-600")
                }
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
    </>
  );
}
