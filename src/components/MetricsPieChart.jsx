import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MetricsPieChart = () => {
  const data = {
    labels: ['Projects', 'Clients', 'Years Exp', 'Industries'],
    datasets: [
      {
        data: [150, 50, 4, 10],
        backgroundColor: [
          'rgba(123, 97, 255, 0.8)', // Purple
          'rgba(0, 240, 255, 0.8)',  // Cyan
          'rgba(255, 255, 255, 0.4)', // White/Alpha
          'rgba(77, 158, 255, 0.8)', // Blue
        ],
        borderColor: [
          '#7B61FF',
          '#00F0FF',
          '#ffffff',
          '#4D9EFF',
        ],
        borderWidth: 1,
        hoverOffset: 10,
        borderRadius: 5,
        spacing: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(23, 23, 23, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        displayColors: true,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center py-2">
      <div className="w-full h-full max-h-[180px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-[20px] font-bold text-white">150+</span>
        <span className="text-[10px] text-[#aaaaaa] uppercase tracking-wider">Total Impact</span>
      </div>
      <div className="absolute bottom-[-10px] left-0 right-0 flex flex-wrap justify-center gap-x-4 gap-y-1">
        {data.labels.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: data.datasets[0].borderColor[i] }}
            />
            <span className="text-[10px] text-[#888888]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsPieChart;
