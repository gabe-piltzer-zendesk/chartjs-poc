import React, { memo, useEffect, useRef } from 'react';
import { Chart, ChartData } from 'chart.js';
import { AnyObject, EmptyObject } from 'chart.js/dist/types/basic';

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
  onRenderComplete: (timeMS: number) => void;
}

const ChartJSPerformance: React.FC<Props> = ({ count, onRenderComplete }) => {
  const chartId = 'line-chart-performance';
  const data = generateData(count);
  const renderMS = useRef<number>(0);
  const renderStart = useRef<number>(0);

  useEffect(() => {
    // @ts-ignore
    const chart = new Chart(document.getElementById(chartId), {
      type: 'line',
      data,
      plugins: [
        {
          beforeRender(
            chart: Chart,
            args: { cancelable: true },
            options: AnyObject
          ): boolean | void {
            renderStart.current = Date.now();
          },
          // This isn't the perfect event, it fires on all renders including hover and resize
          afterRender(chart: Chart, args: EmptyObject, options: AnyObject) {
            renderMS.current = Date.now() - renderStart.current;
            if (renderMS.current > 0) {
              onRenderComplete(renderMS.current);
            }
          },
        },
      ],
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
