import { PluginChartOptions, TooltipItem } from 'chart.js/dist/types';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

export const getPlugins = (
  fontWeights: any,
  lastStorageDate: string,
  lastStorageValue: number,
  limit: number,
  palette: any,
  rtl: boolean,
  title: string | undefined
): _DeepPartialObject<PluginChartOptions<'line'>> => ({
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
          yValue: limit + 15,
          content: `${limit} GB limit`, // Annotation labels should be dynamic, could come in with the data object
          color: palette.grey[600],
        },
        // usageLineLabel: {
        //   type: 'label',
        //   xValue: lastStorageDate,
        //   xAdjust: -70,
        //   yValue: lastStorageValue + 15,
        //   content: `${lastStorageValue} GB used`,
        //   color: palette.red[600],
        //   font: {
        //     weight: fontWeights.bold,
        //   },
        // },
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
            return `${Math.abs(diff).toFixed(1)} over ${limit} GB limit`;
          } else if (diff === 0) {
            return `${limit} GB limit met`;
          } else {
            return `${Math.abs(diff).toFixed(1)} of ${limit} GB remaining`;
          }
        },
        title: (ctx: TooltipItem<'line'>[]) => {
          const item = ctx[0];
          return `${Math.abs(
            item.dataset.data[item.dataIndex] as number
          ).toFixed(1)} GB used`;
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
      rtl,
      titleColor: palette.red[600],
    },
  },
});
