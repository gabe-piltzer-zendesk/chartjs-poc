import {
  ChartDataset,
  ScriptableContext,
  ScriptableLineSegmentContext,
} from 'chart.js/dist/types';
import { getColorByLimit, getSegmentColor } from '../../../utils/helpers';
import { LIMIT } from '../../usage/StorageUsage/data';
import { LineChartData } from '../../../utils/types';

export const getDataset = (
  data: number[],
  label: string | undefined,
  lineChartData: LineChartData[],
  palette: any
): ChartDataset<'line', number[]> => ({
  label,
  data,
  pointBackgroundColor: (ctx: ScriptableContext<'line'>) =>
    getColorByLimit(
      LIMIT,
      LIMIT * 0.7,
      ctx.dataset.data[ctx.dataIndex] as number,
      palette
    ),
  pointBorderColor: (ctx: ScriptableContext<'line'>) =>
    getColorByLimit(
      LIMIT,
      LIMIT * 0.7,
      ctx.dataset.data[ctx.dataIndex] as number,
      palette
    ),
  segment: {
    borderColor: (ctx: ScriptableLineSegmentContext) =>
      getSegmentColor(
        ctx.datasetIndex,
        ctx.p0DataIndex,
        lineChartData,
        palette,
        LIMIT
      ),
  },
});
