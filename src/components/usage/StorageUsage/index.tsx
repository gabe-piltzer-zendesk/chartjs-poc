import React, { memo } from 'react';
import ChartJSLineChart from '../../charts/ChartJS/LineChart';
import { LIMIT, MONTHLY_DATA } from './data';
import { nanoid } from 'nanoid';
import { DemoApp, LineChartData, LineChartOptions } from '../../../utils/types';
import { useTheme } from 'styled-components';
import { getPlugins } from '../../charts/options/plugins';
import { getScales } from '../../charts/options/scales';
import StorageUsageReactChartJS from './StorageUsageReactChartJS';

const getColorByLimit = (
  limit: number,
  threshold: number,
  value: number,
  palette: any
) => {
  if (value >= limit) {
    return palette.red[600];
  } else if (value >= threshold) {
    return palette.yellow[600];
  } else {
    return palette.green[200];
  }
};

const getSegmentColor = (
  datasetIndex: number,
  dataIndex: number,
  data: LineChartData[],
  palette: any,
  limit: number
): string | undefined => {
  const chartData = data[datasetIndex];
  const value = chartData.values[dataIndex];
  const threshold = limit * 0.7;
  return getColorByLimit(limit, threshold, value, palette);
};

interface Props {
  demoApp: DemoApp;
}

const StorageUsage: React.FC<Props> = ({ demoApp }) => {
  // @ts-ignore
  const { fontWeights, palette } = useTheme();

  const chartId = nanoid();
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

  // Chart.js
  const chartJSData: LineChartData[] = [usageLineData];

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
    <>
      {demoApp === 'CHARTJS' && (
        <ChartJSLineChart
          data={chartJSData}
          id={chartId}
          labels={labels}
          limit={LIMIT}
          options={options}
          segmentColorCallback={getSegmentColor}
        ></ChartJSLineChart>
      )}
      {demoApp === 'REACTCHARTJS2' && <StorageUsageReactChartJS />}
    </>
  );
};

export default memo(StorageUsage);
