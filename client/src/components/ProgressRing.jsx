import React, { useContext } from 'react';
import styled from 'styled-components';

import uploadContext from '../context/uploadContext';

const getColourFromStatus = status => {
  if (status === 'active' || status === 'idle') {
    return '#EAEAEA';
  } else if (status === 'success') {
    return '#008466';
  } else if (status === 'error') {
    return '#EE2F4F';
  }
};

const Container = styled.svg`
  position: absolute;
  top: 0;

  height: 320px;
  width: 320px;

  pointer-events: none;
`;

const Ring = styled.circle`
  fill: transparent;

  stroke: ${({ transferStatus }) => getColourFromStatus(transferStatus)};
  stroke-width: 2px;
  stroke-dasharray: ${({ circumference }) => `${circumference} ${circumference}`};
  stroke-dashoffset: ${({ offset }) => offset};

  transition: all 0.35s;

  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

export default () => {
  const { percent, transferStatus } = useContext(uploadContext);

  const radius = 158;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <Container>
      <Ring
        r={158}
        cx={160}
        cy={160}
        circumference={circumference}
        offset={offset}
        transferStatus={transferStatus}
      />
    </Container>
  );
};
