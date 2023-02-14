import React, { memo } from 'react';
import ReactChartJS2LineChart from '../../charts/ReactChartJS2';
import { ChartData } from 'chart.js';
import { LIMIT, MONTHLY_DATA } from './data';
import { LineChartData, LineChartOptions } from '../../../utils/types';
import { useTheme } from 'styled-components';
import { getPlugins } from '../../charts/options/plugins';
import { getScales } from '../../charts/options/scales';
import { getDataset } from '../../charts/options/dataset';

const StorageUsageReactChartJS: React.FC = () => {
  // @ts-ignore
  const { fontWeights, palette, rtl } = useTheme();

  // API data
  const storageData = MONTHLY_DATA;
  const values = storageData.map((data) => data.value);
  const usageLineData: LineChartData = {
    label: 'Usage',
    values,
  };

  // X-Axis labels
  let showLabel = true;
  const labels = storageData.map((data, index) => {
    // Show every other label and the last one
    data.showLabel = showLabel || index === storageData.length - 1;
    showLabel = !showLabel;
    return new Date(data.date).toLocaleDateString();
  });

  // Chart data
  const lineChartData: LineChartData[] = [usageLineData];
  const chartData: ChartData<'line', number[], string> = {
    labels,
    datasets: lineChartData.map((d) =>
      getDataset(d.values, d.label, lineChartData, palette)
    ),
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
    rtl,
    undefined
  );
  const scales = getScales(
    storageData,
    fontWeights,
    rtl,
    xAxisLabel,
    yAxisLabel
  );
  const options: LineChartOptions = {
    ...plugins,
    ...scales,
  };

  return (
    <ReactChartJS2LineChart
      data={chartData}
      dir={rtl ? 'rtl' : 'ltr'}
      options={options}
    ></ReactChartJS2LineChart>
  );
};
export default memo(StorageUsageReactChartJS);
