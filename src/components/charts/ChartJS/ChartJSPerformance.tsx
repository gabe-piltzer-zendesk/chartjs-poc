import React, { memo, useEffect } from 'react';
import { Chart, ChartData } from 'chart.js';

const generateData = (count: number): ChartData<'line', number[], string> => {
  const values = [];
  const labels = [];

  for (let i = 0; i < count; i++) {
    values.push(Math.random());
    labels.push(i.toString());
  }

  return {
    labels,
    datasets: [
      {
        label: 'Point',
        data: values,
      },
    ],
  };
};

interface Props {
  count: number;
}

const ChartJSPerformance: React.FC<Props> = ({ count }) => {
  const chartId = 'line-chart-performance';
  const data = generateData(count);

  useEffect(() => {
    // @ts-ignore
    const chart = new Chart(document.getElementById(chartId), {
      type: 'line',
      data,
    });

    // Cleanup chart canvas
    return () => {
      chart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return <canvas id={chartId}></canvas>;
};

export default memo(ChartJSPerformance);
