import React, { useContext } from 'react';
import styled from 'styled-components';

import uploadContext from '../context/uploadContext';

const Container = styled.svg`
  position: relative;
  top: -160px;

  height: 320px;
  width: 320px;

  pointer-events: none;
`

const Ring = styled.circle`
  stroke-width: 2px;
  stroke-dasharray: ${({ circumference }) => `${circumference} ${circumference}`};
  stroke-dashoffset: ${({ offset }) => offset};
  fill: transparent;
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

export default () => {
  console.log('Rendering the ring, I guess');
  const { percent } = useContext(uploadContext)

  const radius = 158;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percent / 100 * circumference;

  return (
    <Container>
      <Ring
        stroke="#ffffff"
        r={158}
        cx={160}
        cy={160}
        circumference={circumference}
        offset={offset}
      >
      </Ring>
    </Container>
  )
}
