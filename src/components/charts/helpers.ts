import { LineChartOptions, StorageData } from '../../utils/types';
import { Tick, TooltipItem } from 'chart.js';

const getOptions = (
  data: StorageData[],
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
        limitLine: {
          type: 'line',
          yMin: limit,
          yMax: limit,
          borderColor: palette.grey[600],
          borderWidth: 2,
        },
        limitLineLabel: {
          type: 'label',
          xValue: lastStorageDate,
          xAdjust: -70,
          yValue: limit + 10,
          content: `${limit} GB limit`, // Annotation labels should be dynamic, could come in with the data object
          color: palette.grey[600],
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
      backgroundColor: 'white',
      callbacks: {
        footer: (ctx: TooltipItem<'line'>[]) => {
          const item = ctx[0];
          return `As of ${item.label}`;
        },
        label: (ctx: TooltipItem<'line'>) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          const diff = value - limit;
          if (diff > 0) {
            return `${Math.abs(diff).toFixed(1)} GB over ${limit} GB limit`;
          } else if (diff === 0) {
            return `${limit} GB limit met`;
          } else {
            return `${Math.abs(diff).toFixed(
              1
            )} GB until ${limit} GB limit is met`;
          }
        },
        title: (ctx: TooltipItem<'line'>[]) => {
          const item = ctx[0];
          return `${item.dataset.data[item.dataIndex]} GB used`;
        },
      },
      displayColors: false,
      bodyColor: 'black',
      borderColor: palette.grey[400],
      borderWidth: 1,
      footerColor: palette.grey[600],
      footerFont: {
        size: 12,
      },
      padding: 10,
      titleColor: palette.red[600],
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        callback: (value: any, index: number, ticks: Tick[]) => {
          return data[index].showLabel
            ? new Date(data[index].date).toLocaleDateString()
            : undefined;
        },
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
      suggestedMin: 0, // TODO - don't hardcode
      suggestedMax: 600, // TODO - don't hardcode
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
