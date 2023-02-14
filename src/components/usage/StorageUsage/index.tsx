import React, { memo } from 'react';
import { DemoApp } from '../../../utils/types';
import StorageUsageReactChartJS from './StorageUsageReactChartJS';
import StorageUsageChartJS from './StorageUsageChartJS';
import PerformanceWrapper from '../../performance';

interface Props {
  demoApp: DemoApp;
}

const StorageUsage: React.FC<Props> = ({ demoApp }) => {
  return (
    <>
      {demoApp === 'CHARTJS' && <StorageUsageChartJS />}
      {demoApp === 'CHARTJSPERF' && <PerformanceWrapper />}
      {demoApp === 'REACTCHARTJS2' && <StorageUsageReactChartJS />}
    </>
  );
};

export default memo(StorageUsage);
