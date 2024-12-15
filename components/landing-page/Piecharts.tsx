import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register the required elements with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieCharts() {
  const pieData = [
    {
      title: "25%",
      percentage: 25,
      color: "#FF5757",
      content: "fail within one year of a disaster.",
    },
    {
      title: "40%",
      percentage: 40,
      color: "#FF2B2B",
      content: "of businesses do not reopen following a disaster.",
    },
    {
      title: "90%",
      percentage: 90,
      color: "#FF0000",
      content:
        "of companies fail within two years of being struck by a disaster.",
    },
  ];

  return (
    <>
      <h1 className="flex justify-center mx-auto font-bold text-3xl mb-14 mt-[10rem]">
        Attack Consequences On Businesses
      </h1>

      <div className="flex flex-wrap justify-center max-w-[70rem] mx-auto bg-blue-600 rounded-lg text-slate-200 p-6">
        {pieData.map((data, index) => (
          <div
            key={index}
            className="card px-2 md:w-72 mx-auto rounded-lg flex flex-col justify-between py-6" // Added dark mode class
          >
            <div className="card-body items-center text-center flex-grow w-72">
              <Pie
                data={{
                  labels: [`${data.percentage}%`],
                  datasets: [
                    {
                      data: [data.percentage, 100 - data.percentage],
                      backgroundColor: [data.color, "#E0E0E0"],
                      hoverBackgroundColor: [data.color, "#E0E0E0"],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: true,
                  responsive: true,
                  animation: {
                    duration: 500,
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            <header className="card-title mb-3 text-4xl mx-auto flex items-center justify-center">
              {data.title}
            </header>
            <p className="mx-auto text-center p-4 h-[5rem] text-xl">
              {data.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
