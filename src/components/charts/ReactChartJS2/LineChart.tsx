import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from "chart.js";
import { LineChartOptions } from "../../../utils/types";

interface Props {
    data: ChartData<'line', number[], string>
    options?: LineChartOptions
}

const LineChart: React.FC<Props> = ({data, options}) => {
    return <Line data={data} options={options}></Line>
}

export default memo(LineChart);
