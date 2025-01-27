type UserOverviewProps = {
  email: string | null;
  subscribed: boolean;
  daysLeft: number | null;
};

type InvoiceData = {
  email: string;
  date: string;
  amount: string;
};

const invoiceData: InvoiceData[] = [
  {
    email: "cutefs@orkaca.com",
    date: "2021-10-01",
    amount: "29.00$",
  },
  {
    email: "cutefs@orkaca.com",
    date: "2021-10-01",
    amount: "29.00$",
  },
];

export default function Invoices({
  email,
  subscribed,
  daysLeft,
}: UserOverviewProps) {
  return (
    <div className="mx-auto rounded-lg">
      <div className="flex items-center mb-4 space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#2563EB"
        >
          <path d="M320-160q-33 0-56.5-23.5T240-240v-120h120v-90q-35-2-66.5-15.5T236-506v-44h-46L60-680q36-46 89-65t107-19q27 0 52.5 4t51.5 15v-55h480v520q0 50-35 85t-85 35H320Zm120-200h240v80q0 17 11.5 28.5T720-240q17 0 28.5-11.5T760-280v-440H440v24l240 240v56h-56L510-514l-8 8q-14 14-29.5 25T440-464v104ZM224-630h92v86q12 8 25 11t27 3q23 0 41.5-7t36.5-25l8-8-56-56q-29-29-65-43.5T256-684q-20 0-38 3t-36 9l42 42Zm376 350H320v40h286q-3-9-4.5-19t-1.5-21Zm-280 40v-40 40Z" />
        </svg>
        <span className="text-xl font-bold">Invoices</span>
      </div>
      <div className="max-h-96 overflow-y-scroll">
        <table className="table">
          <thead>
            <tr className="text-gray-400">
              <th></th>
              <th className=" ">Individual Plan for</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{invoice.email}</td>
                <td>{invoice.date}</td>
                <td>{invoice.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
