import React from 'react';
import styled from 'styled-components';

import UploadInput from './UploadInput';
import ProgressRing from './ProgressRing';

const UploaderContainer = styled.div`
  position: relative;

  height: 320px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <UploaderContainer>
    <UploadInput />
    <ProgressRing />
  </UploaderContainer>
);
