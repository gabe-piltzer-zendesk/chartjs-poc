import React, { memo, useState } from 'react';
import Performance from '../charts/ChartJS/ChartJSPerformance';
import styled from 'styled-components';

const StyledSelect = styled.select`
  margin-left: 20px;
`;

const PerformanceWrapper: React.FC = () => {
  const [count, setCount] = useState(10);

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
      </div>
      <Performance count={count} />
    </>
  );
};

export default memo(PerformanceWrapper);
