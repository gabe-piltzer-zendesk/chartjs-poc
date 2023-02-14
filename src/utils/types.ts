import {
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

type DemoApp = 'CHARTJS' | 'CHARTJSPERF' | 'REACTCHARTJS2';

type LineChartOptions = _DeepPartialObject<
  CoreChartOptions<'line'> &
    ElementChartOptions<'line'> &
    PluginChartOptions<'line'> &
    DatasetChartOptions<'line'> &
    ScaleChartOptions<'line'> &
    LineControllerChartOptions
>;

interface LineChartData {
  annotationLabel?: string;
  borderColor?: string;
  label?: string;
  values: number[];
}

interface StorageData {
  date: string;
  id: string;
  showLabel?: boolean; // Client only
  value: number;
}

export { DemoApp, LineChartData, LineChartOptions, StorageData };
