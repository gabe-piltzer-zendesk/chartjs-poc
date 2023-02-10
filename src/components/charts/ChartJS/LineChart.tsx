import React, { memo, useEffect } from 'react';
import { Chart } from 'chart.js';
import { LineChartData, LineChartOptions } from '../../../utils/types';
import { useTheme } from 'styled-components';
import { ScriptableLineSegmentContext } from 'chart.js/dist/types';

export interface LineChartProps {
  id: string;
  data: LineChartData[];
  labels: string[];
  limit: number;
  options: LineChartOptions;
  segmentColorCallback: (
      datasetIndex: number,
      p1DataIndex: number,
      data: LineChartData[],
      palette: any,
      limit: number,
  ) => void;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  id,

    labels,
  limit,
  options,
                                               segmentColorCallback,
}) => {
  const chartId = `line-chart-${id}`;

  // @ts-ignore
  const {palette} = useTheme();

  useEffect(() => {
    // @ts-ignore
    const chart = new Chart(document.getElementById(chartId), {
      type: 'line',
      data: {
        labels,
        datasets: data.map((d) => {
          return {
            borderColor: d.borderColor,
            borderWidth: 3,
            data: d.values,
            fill: false,
            label: d.label,
            // pointHoverBorderColor: 'black',
            pointHoverRadius: 6,
            // pointStyle: false,
            segment: {
              borderColor: (ctx: ScriptableLineSegmentContext) =>
                  segmentColorCallback(
                      ctx.datasetIndex,
                      ctx.p1DataIndex,
                      data,
                      palette,
                      limit,
                  ),
            },
            spanGaps: true,
          };
        }),
      },
      options,
    });

    // Cleanup chart canvas
    return () => {
      chart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas id={chartId}></canvas>;
};

export default memo(LineChart);
