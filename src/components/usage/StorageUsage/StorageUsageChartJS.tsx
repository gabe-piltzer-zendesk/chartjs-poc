import React, { memo } from 'react';
import {
  bucketYearDataByMonth,
  generateYearData,
  LIMIT,
} from '../../../utils/data';
import ChartJSLineChart from '../../charts/ChartJS';
import { useTheme } from 'styled-components';
import { nanoid } from 'nanoid';
import { LineChartData, LineChartOptions } from '../../../utils/types';
import { getPlugins } from '../../charts/options/plugins';
import { getScales } from '../../charts/options/scales';
import { ChartData } from 'chart.js/dist/types';
import { getDataset } from '../../charts/options/dataset';

const StorageUsageChartJS: React.FC = () => {
  // @ts-ignore
  const { fontWeights, palette, rtl } = useTheme();
  const chartId = nanoid();

  // API data
  const begDate = new Date(2022, new Date().getMonth(), 1);
  const allData = generateYearData(begDate, 0, 600);
  const storageData = bucketYearDataByMonth(allData);
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
    <ChartJSLineChart
      data={chartData}
      dir={rtl ? 'rtl' : 'ltr'}
      id={chartId}
      options={options}
    ></ChartJSLineChart>
  );
};

export default memo(StorageUsageChartJS);
