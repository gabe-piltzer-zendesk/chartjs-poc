import React from 'react';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import StorageUsage from './components/usage/StorageUsage';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

const StorageUsageContainer = styled.div`
  padding-left: 20px;
  // This allows Chart.js to make the chart responsive
  // https://www.chartjs.org/docs/master/configuration/responsive.html#important-note
  position: relative;
  height: 80vh;
  width: 100vw;
`;

const App: React.FC = () => {
  const { fonts } = DEFAULT_THEME;

  // Register chart components and set options for all charts
  Chart.register(...registerables, annotationPlugin);
  Chart.defaults.font = {
    family: fonts.system,
    size: 14, // Theme font sizes are strings (e.g. '14px') not numbers
  };

  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME, rtl: false }}>
      <StorageUsageContainer>
        <StorageUsage />
      </StorageUsageContainer>
    </ThemeProvider>
  );
};

export default App;
