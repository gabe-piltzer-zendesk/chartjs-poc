import React, { useState } from 'react';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import StorageUsage from './components/usage/StorageUsage';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { DemoApp } from './utils/types';

const ButtonContainer = styled.div`
  padding: 20px 40px;

  button {
    margin-right: 10px;
  }
`;

const StorageUsageContainer = styled.div`
  padding-left: 20px;
  // This allows Chart.js to make the chart responsive
  // https://www.chartjs.org/docs/master/configuration/responsive.html#important-note
  position: relative;
  height: 80vh;
  width: 100vw;
`;

const App: React.FC = () => {
  const [demoApp, setDemoApp] = useState<DemoApp>('REACTCHARTJS2');
  const { fonts } = DEFAULT_THEME;

  // Register chart components and set options for all charts
  Chart.register(...registerables, annotationPlugin);
  Chart.defaults.font = {
    family: fonts.system,
    size: 14, // Theme font sizes are strings (e.g. '14px') not numbers
  };
  // Chart.defaults.locale = 'ar';

  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME, rtl: false }}>
      <ButtonContainer>
        <button type="button" onClick={() => setDemoApp('CHARTJS')}>
          Chart.js
        </button>
        <button type="button" onClick={() => setDemoApp('REACTCHARTJS2')}>
          react-chartjs-2
        </button>
        {demoApp === 'CHARTJS' && <span>Rendering Chart.js</span>}
        {demoApp === 'REACTCHARTJS2' && <span>Rendering react-chartjs-2</span>}
      </ButtonContainer>
      <StorageUsageContainer>
        <StorageUsage demoApp={demoApp} />
      </StorageUsageContainer>
    </ThemeProvider>
  );
};

export default App;
