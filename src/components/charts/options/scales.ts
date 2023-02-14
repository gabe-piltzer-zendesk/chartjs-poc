import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { ScaleChartOptions, Tick } from 'chart.js';
import { StorageData } from '../../../utils/types';

export const getScales = (
  data: StorageData[],
  fontWeights: any,
  rtl: boolean,
  xAxisLabel: string,
  yAxisLabel: string
): _DeepPartialObject<ScaleChartOptions<'line'>> => ({
  scales: {
    x: {
      grid: {
        display: false,
      },
      reverse: rtl,
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
      min: 0, // TODO - don't hardcode
      max: 600, // TODO - don't hardcode
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
