import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { ScaleChartOptions } from 'chart.js';
import { Tick } from 'chart.js/dist/types';
import { StorageData } from '../../../utils/types';

export const getScales = (
  data: StorageData[],
  fontWeights: any,
  xAxisLabel: string,
  yAxisLabel: string
): _DeepPartialObject<ScaleChartOptions<'line'>> => ({
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