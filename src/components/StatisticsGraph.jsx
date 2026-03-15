import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const StatisticsGraph = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: 'Revenue',
        data: [150, 180, 140, 240, 180, 250, 320, 280, 240, 340, 440, 430],
        borderColor: '#4D9EFF',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(77, 158, 255, 0.3)');
          gradient.addColorStop(1, 'rgba(77, 158, 255, 0)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 20,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4D9EFF',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(23, 23, 23, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(77, 158, 255, 0.3)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `Value: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#888888',
          font: {
            size: 10,
          },
        },
      },
      y: {
        min: 0,
        max: 500,
        ticks: {
          stepSize: 100,
          color: '#888888',
          font: {
            size: 10,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col pt-2 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-[16px] font-medium text-white/90">Statistics</h3>
      </div>
      <div className="flex-1 min-h-0 relative">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default StatisticsGraph;
