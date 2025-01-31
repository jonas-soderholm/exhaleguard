type UserOverviewProps = {
  email: string | null;
  subscribed: boolean;
  daysLeft: number | null;
};

export default function UserOverview({
  email,
  subscribed,
  daysLeft,
}: UserOverviewProps) {
  return (
    <>
      <div className="mx-auto rounded-lg">
        <div className="flex items-center mb-4 space-x-2">
          <span className="text-xl font-bold">Overview</span>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Logged in as:</span>{" "}
            {email ?? "Not available"}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Individual Plan </span>
            <span className={subscribed ? "text-green-500" : "text-red-500"}>
              {subscribed
                ? `Active (${daysLeft ?? "N/A"} days remaining)`
                : "(Inactive)"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
