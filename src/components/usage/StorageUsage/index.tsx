import React, { memo } from 'react';
import ChartJSLineChart from '../../charts/ChartJS/LineChart';
import ReactChartJS2LineChart from '../../charts/ReactChartJS2/LineChart';
import { oneYearMonthlyData } from './data';
import { nanoid } from 'nanoid';
import { DemoApp, LineChartData } from '../../../utils/types';
import { getOptions } from '../../charts/helpers';
import { useTheme } from 'styled-components';
import { ScriptableContext, ScriptableLineSegmentContext } from 'chart.js';
import { ChartData } from 'chart.js/dist/types';

const LIMIT = 370;

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
  const storageData = oneYearMonthlyData;
  const values = storageData.map((data) => data.storageUsed);
  const usageLineData: LineChartData = {
    label: 'Usage',
    values,
  };
  const labels = storageData.map((data) =>
    new Date(data.storageDate).toLocaleDateString()
  );

  // Chart.js
  const chartJSData: LineChartData[] = [usageLineData];

  // react-chartjs-2
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

  const xAxisLabel = 'Date';
  const yAxisLabel = 'Storage (GB)';
  const lastStorage = storageData[storageData.length - 1];
  const lastStorageDate = new Date(
    lastStorage.storageDate
  ).toLocaleDateString();
  const options = getOptions(
    fontWeights,
    lastStorageDate,
    lastStorage.storageUsed,
    LIMIT,
    palette,
    undefined,
    xAxisLabel,
    yAxisLabel
  );

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
      {demoApp === 'REACTCHARTJS2' && (
        <ReactChartJS2LineChart
          data={reactChartJSData}
          dir={'ltr'}
          options={options}
        ></ReactChartJS2LineChart>
      )}
    </>
  );
};

export default memo(StorageUsage);
