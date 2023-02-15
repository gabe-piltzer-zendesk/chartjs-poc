import React, { memo, useState } from 'react';
import Performance from '../charts/ChartJS/ChartJSPerformance';
import styled from 'styled-components';

const StyledSelect = styled.select`
  margin: 0 20px;
`;

const PerformanceWrapper: React.FC = () => {
  const [count, setCount] = useState(10);
  const [renderTimeMS, setRenderTimeMS] = useState(0);

  const renderCompleteHandler = (timeMS: number) => {
    setRenderTimeMS(timeMS);
  };

  return (
    <>
      <div>
        <StyledSelect
          name="count"
          id="count"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        >
          <option value="10">10</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </StyledSelect>
        <span>Rendered in {renderTimeMS} MS</span>
      </div>
      <Performance count={count} onRenderComplete={renderCompleteHandler} />
    </>
  );
};

export default memo(PerformanceWrapper);
