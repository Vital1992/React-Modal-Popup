import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title);

const LineChart = () => {
  // Define your data
  const labels = ['Mar 30', 'Mar 31', 'Apr 1', 'Apr 2', 'Apr 3'];
  const data = {
    labels: labels,
    datasets: [{
    //   label: '$',
      data: ['5000', '8789', '9234', '9000', '9500'],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.5,
      pointHoverBackgroundColor: 'rgb(75, 192, 192)',
      pointHoverBorderColor: 'rgb(75, 192, 192)',
      pointBackgroundColor: 'rgb(75, 192, 192)',
      pointBorderColor: 'rgb(75, 192, 192)',
      pointHoverRadius: 7,
      
    }]
  };

  // Define your chart configuration
  const chartConfig = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return '$' + value;
                    }
                }
            }
        }
    }
  };

  return (
    <div>
      <h2>Line Chart</h2>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Line data={data} options={chartConfig} />
      </div>
    </div>
  );
};

export default LineChart;