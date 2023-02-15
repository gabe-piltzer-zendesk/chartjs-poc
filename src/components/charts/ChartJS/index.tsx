import React, { memo, useEffect } from 'react';
import { Chart } from 'chart.js';
import { LineChartOptions } from '../../../utils/types';
import { ChartData } from 'chart.js/dist/types';

export interface Props {
  data: ChartData<'line', number[], string>;
  dir: 'ltr' | 'rtl';
  id: string;
  options: LineChartOptions;
}

const LineChart: React.FC<Props> = ({ data, dir, id, options }) => {
  const chartId = `line-chart-${id}`;

  useEffect(() => {
    // @ts-ignore
    const chart = new Chart(document.getElementById(chartId), {
      type: 'line',
      data,
      options,
    });

    // Cleanup chart canvas
    return () => {
      chart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas aria-label="Line chart" dir={dir} id={chartId}></canvas>;
};

export default memo(LineChart);
