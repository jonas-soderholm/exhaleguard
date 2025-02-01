import { getInvoice } from "@/utils/stripe/stripe-actions";

type InvoiceData = {
  id: number;
  payDate: Date;
  amount: number;
  status: string;
  userId: string;
  stripeRef: string;
  planMembers: string;
};

export default async function Invoices() {
  const invoiceData: InvoiceData[] = await getInvoice();

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
          <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
        </svg>
        <span className="text-xl font-bold">Invoices</span>
      </div>
      <div className="max-h-96 overflow-y-scroll">
        <table className="table table-xs">
          <thead>
            <tr className="text-gray-400">
              {/* <th></th> */}
              <th>Date</th>
              <th>Amount</th>
              <th>Individual Plan For</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice, index) => (
              <tr key={index}>
                {/* <td>{index + 1}</td> */}
                <td>{invoice.payDate.toLocaleDateString()}</td>
                <td>{invoice.amount}.00$</td>
                <td>{invoice.planMembers}</td>
                <td>{invoice.stripeRef}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
