import { redirect } from "next/navigation";
import { getFullUser } from "@/utils/user-actions/get-user";
import AccountTabsLayout from "@/components/account/AccountTabsLayout";
import UserOverview from "@/components/account/UserOverview";
import IndividualPlan from "@/components/account/IndividualPlan";
import Team from "@/components/account/Team";
import Invoices from "@/components/account/Invoices";
import Settings from "@/components/account/Settings";

export default async function AccountLayout() {
  const accountData = await getFullUser();

  // Redirect if the user is not authenticated
  if (!accountData || !accountData.email) {
    redirect("/sign-in");
  }

  // Define menu items directly with the fetched data
  const menuItems = [
    {
      name: "Overview",
      content: (
        <UserOverview
          email={accountData.email}
          subscribed={accountData.subscribed}
          daysLeft={accountData.daysLeft}
        />
      ),
    },
    {
      name: "Individual Plan",
      content: (
        <IndividualPlan
          email={accountData.email}
          subscribed={accountData.subscribed}
          daysLeft={accountData.daysLeft}
        />
      ),
    },
    {
      name: "Team",
      content: <Team />,
    },
    {
      name: "Invoices",
      content: <Invoices />,
    },
    {
      name: "Settings",
      content: <Settings />,
    },
  ];

  // Render the client layout with the menu items
  return <AccountTabsLayout menuItems={menuItems} />;
}
