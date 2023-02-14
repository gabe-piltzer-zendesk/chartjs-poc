import React, { memo } from 'react';
import { LIMIT, MONTHLY_DATA } from './data';
import { getSegmentColor } from '../../../utils/helpers';
import ChartJSLineChart from '../../charts/ChartJS';
import { useTheme } from 'styled-components';
import { nanoid } from 'nanoid';
import { LineChartData, LineChartOptions } from '../../../utils/types';
import { getPlugins } from '../../charts/options/plugins';
import { getScales } from '../../charts/options/scales';

const StorageUsageChartJS: React.FC = () => {
  // @ts-ignore
  const { fontWeights, palette, rtl } = useTheme();

  // Data
  const chartId = nanoid();
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
      data={chartJSData}
      id={chartId}
      labels={labels}
      limit={LIMIT}
      options={options}
      segmentColorCallback={getSegmentColor}
    ></ChartJSLineChart>
  );
};

export default memo(StorageUsageChartJS);
