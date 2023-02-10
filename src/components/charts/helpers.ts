import { LineChartOptions } from '../../utils/types';

const getOptions = (
  fontWeights: any,
  lastStorageDate: string,
  lastStorageValue: number,
  limit: number,
  palette: any,
  title: string | undefined,
  xAxisLabel: string,
  yAxisLabel: string
): LineChartOptions => ({
  plugins: {
    annotation: {
      annotations: {
        thresholdLine: {
          type: 'line',
          yMin: limit,
          yMax: limit,
          borderColor: palette.grey[600],
          borderWidth: 2,
        },
        thresholdLineLabel: {
          type: 'label',
          xValue: lastStorageDate,
          xAdjust: -70,
          yValue: limit + 10,
          content: `${limit} GB limit`, // Annotation labels should be dynamic, could come in with the data object
          color: palette.grey[600],
          font: {
            weight: fontWeights.bold,
          },
        },
        usageLineLabel: {
          type: 'label',
          xValue: lastStorageDate,
          xAdjust: -70,
          yValue: lastStorageValue + 10,
          content: `${lastStorageValue} GB used`,
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
        padding: 10,
        text: xAxisLabel,
      },
    },
    y: {
      title: {
        display: true,
        font: {
          weight: fontWeights.bold,
        },
        padding: 20,
        text: yAxisLabel,
      },
    },
  },
});

export { getOptions };
