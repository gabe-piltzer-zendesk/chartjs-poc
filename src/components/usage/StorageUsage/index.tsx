import React, { memo } from 'react';
import ChartJSLineChart from '../../charts/ChartJS/LineChart';
import { generateStorageUsageData, X_AXIS_LABELS } from './data';
import { nanoid } from 'nanoid';
import { LineChartData } from '../../../utils/types';

const NUMBER_OF_POINTS = 30;
const LIMIT = 160;

const getSegmentColor = (
  datasetIndex: number,
  p1DataIndex: number,
  data: LineChartData[],
  palette: any
): string | undefined => {
  const chartData = data[datasetIndex];
  const value = chartData.values[p1DataIndex];

  if (value <= 100) {
    return palette.green[600];
  } else if (value <= 160) {
    return palette.yellow[600];
  } else {
    return palette.red[600];
  }
};

const StorageUsage: React.FC = () => {
  const chartId = nanoid();
  const storageData = generateStorageUsageData(NUMBER_OF_POINTS, LIMIT);

  const usageLineData: LineChartData = {
    label: 'Usage',
    values: storageData.map((data) => data.storageUsed),
  };

  const data: LineChartData[] = [usageLineData];

  return (
    <ChartJSLineChart
      data={data}
      id={chartId}
      segmentColorCallback={getSegmentColor}
      threshold={LIMIT}
      title="Data storage (GB)"
      xAxisLabel="Date"
      xAxisLabels={X_AXIS_LABELS}
      yAxisLabel="Storage"
    ></ChartJSLineChart>
  );
};

export default memo(StorageUsage);
