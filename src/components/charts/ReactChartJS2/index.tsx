import React, { memo, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { LineChartOptions } from '../../../utils/types';

interface Props {
  data: ChartData<'line', number[], string>;
  dir: 'ltr' | 'rtl';
  options?: LineChartOptions;
}

const LineChart: React.FC<Props> = ({ data, dir, options }) => {
  // This is used for RTL and is WIP
  const chartRef = useRef<any>(null);
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.canvas.dir = dir;
      chart.canvas.ariaLabel = 'Line chart';
    }
  }, [dir]);

  return <Line data={data} options={options} ref={chartRef} />;
};

export default memo(LineChart);
