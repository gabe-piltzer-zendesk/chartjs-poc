import React, { memo } from 'react';
import ReactChartJS2LineChart from '../../charts/ReactChartJS2/LineChart';
import { ChartData } from 'chart.js';
import {
  ScriptableContext,
  ScriptableLineSegmentContext,
} from 'chart.js/dist/types';
import { LIMIT, MONTHLY_DATA } from './data';
import { LineChartData, LineChartOptions } from '../../../utils/types';
import { useTheme } from 'styled-components';
import { getPlugins } from '../../charts/options/plugins';
import { getScales } from '../../charts/options/scales';
import { getColorByLimit, getSegmentColor } from '../../../utils/helpers';

const StorageUsageReactChartJS: React.FC = () => {
  // @ts-ignore
  const { fontWeights, palette } = useTheme();

  const storageData = MONTHLY_DATA;
  const values = storageData.map((data) => data.value);
  const usageLineData: LineChartData = {
    label: 'Usage',
    values,
  };
  const chartJSData: LineChartData[] = [usageLineData];

  // X-Axis labels
  let showLabel = true;
  const labels = storageData.map((data, index) => {
    // Show every other label and the last one
    data.showLabel = showLabel || index === storageData.length - 1;
    showLabel = !showLabel;
    return new Date(data.date).toLocaleDateString();
  });

  const reactChartJSData: ChartData<'line', number[], string> = {
    labels,
    datasets: chartJSData.map((data) => {
      return {
        label: data.label,
        data: data.values,
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
              chartJSData,
              palette,
              LIMIT
            ),
        },
      };
    }),
  };

  // Options
  const xAxisLabel = 'Date';
  const yAxisLabel = 'Storage (GB)';
  const lastStorage = storageData[storageData.length - 1];
  const lastStorageDate = new Date(lastStorage.date).toLocaleDateString();

  const plugins = getPlugins(
    fontWeights,
    lastStorageDate,
    lastStorage.value,
    LIMIT,
    palette,
    undefined
  );
  const scales = getScales(storageData, fontWeights, xAxisLabel, yAxisLabel);
  const options: LineChartOptions = {
    ...plugins,
    ...scales,
  };

  return (
    <ReactChartJS2LineChart
      data={reactChartJSData}
      dir={'rtl'}
      options={options}
    ></ReactChartJS2LineChart>
  );
};
export default memo(StorageUsageReactChartJS);
