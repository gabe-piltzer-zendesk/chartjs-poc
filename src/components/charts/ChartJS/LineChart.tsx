import React, { memo, useEffect } from 'react';
import { Chart } from 'chart.js';
import { LineChartData } from '../../../utils/types';
import { useTheme } from 'styled-components';
import { ScriptableLineSegmentContext } from 'chart.js/dist/types';

export interface LineChartProps {
  id: string;
  data: LineChartData[];
  segmentColorCallback: (
    datasetIndex: number,
    p1DataIndex: number,
    data: LineChartData[],
    palette: any
  ) => void;
  threshold: number;
  title: string;
  xAxisLabel: string;
  xAxisLabels: string[];
  yAxisLabel: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  id,
  segmentColorCallback,
  threshold,
  title,
  xAxisLabel,
  xAxisLabels,
  yAxisLabel,
}) => {
  const chartId = `line-chart-${id}`;

  // @ts-ignore
  const { fontWeights, palette } = useTheme();

  const options = {
    plugins: {
      annotation: {
        annotations: {
          thresholdLine: {
            type: 'line',
            yMin: threshold,
            yMax: threshold,
            borderColor: palette.grey[600],
            borderWidth: 2,
          },
          thresholdLineLabel: {
            type: 'label',
            xValue: '28',
            yValue: threshold + 20,
            content: `${threshold} GB limit`, // Annotation labels should be dynamic, could come in with the data object
            color: palette.grey[600],
            font: {
              weight: fontWeights.bold,
            },
          },
          usageLineLabel: {
            type: 'label',
            xValue: '28',
            yValue: 580,
            content: '580.3 GB used',
            color: palette.red[600],
            font: {
              weight: fontWeights.bold,
            },
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        align: 'start',
        display: true,
        padding: 20, // Theme space values are strings (e.g. '20px') not numbers
        text: title,
      },
      tooltip: {
        callbacks: {
          title: () => '',
        },
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          font: {
            weight: fontWeights.bold,
          },
          text: xAxisLabel,
        },
      },
      y: {
        title: {
          display: true,
          font: {
            weight: fontWeights.bold,
          },
          text: yAxisLabel,
        },
      },
    },
  };

  useEffect(() => {
    // @ts-ignore
    const chart = new Chart(document.getElementById(chartId), {
      type: 'line',
      data: {
        labels: xAxisLabels,
        datasets: data.map((d) => {
          return {
            borderColor: d.borderColor,
            borderWidth: 3,
            data: d.values,
            fill: false,
            label: d.label,
            // pointHoverBorderColor: 'black',
            pointHoverRadius: 6,
            pointStyle: false,
            segment: {
              borderColor: (ctx: ScriptableLineSegmentContext) =>
                segmentColorCallback(
                  ctx.datasetIndex,
                  ctx.p1DataIndex,
                  data,
                  palette
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
