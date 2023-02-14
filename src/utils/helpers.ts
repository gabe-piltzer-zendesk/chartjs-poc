import { LineChartData } from './types';

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

export { getColorByLimit, getSegmentColor };
