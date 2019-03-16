import React from 'react';
import styled from 'styled-components';

const Ring = styled.circle`
  stroke-width: 2px;
  stroke-dasharray: ${({ circumference }) => `${circumference} ${circumference}`};
  stroke-dashoffset: ${({ offset }) => offset};
  fill: transparent;
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

export default ({ percent=0 }) => {
  const radius = 158;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percent / 100 * circumference;

  return (
    <svg
      height={320}
      width={320}
      style={{ position: 'relative', top: '320px' }}
    >
      <Ring
        className="progress__ring"
        stroke="#ffffff"
        r={158}
        cx={160}
        cy={160}
        circumference={circumference}
        offset={offset}
      >
      </Ring>
    </svg>
  )
}
