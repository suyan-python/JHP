import React from "react";
import Customer from "../../assets/customer.svg";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const data = {
    labels: ["Excellent", "Good", "Average", "Poor"],
    datasets: [
      {
        label: "Customer Feedback",
        data: [120, 90, 50, 10],
        backgroundColor: [
          "rgba(34,197,94,0.8)", // Excellent (green)
          "rgba(59,130,246,0.8)", // Good (blue)
          "rgba(251,191,36,0.8)", // Average (yellow)
          "rgba(239,68,68,0.8)", // Poor (red)
        ],
        borderColor: [
          "rgba(34,197,94,1)",
          "rgba(59,130,246,1)",
          "rgba(251,191,36,1)",
          "rgba(239,68,68,1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#374151",
          font: {
            size: 16,
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value} customers`;
          },
        },
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#6b7280",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4B5563",
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        ticks: {
          color: "#4B5563",
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-10 py-12">
      <div className="w-full md:w-1/2 hidden md:block">
        <img
          src={Customer}
          alt="Customer Satisfaction"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4">
        <h2 className="text-4xl font-bold mb-6 text-center text-brownn">
          Customer Satisfaction Levels
        </h2>
        <p className="text-gray-600 mb-8 text-center text-lg">
          Our customers share their experience with the quality of our coffee.
        </p>
        <div className="w-full h-[400px] md:h-[450px]">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
