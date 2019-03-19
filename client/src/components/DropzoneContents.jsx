import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTransition, animated, config } from 'react-spring';

import IconUpload from '../icons/IconUpload';
import IconSuccess from '../icons/IconSuccess';
import IconError from '../icons/IconError';

import uploadContext from '../context/uploadContext';

import {
  STATUS_IDLE,
  STATUS_ACTIVE,
  STATUS_SUCCESS,
  STATUS_ERROR,
  STATUS_RESETTING,
} from '../constants/uploadStatuses.js';

const commonStyles = {
  position: 'absolute',
  padding: '12px 32px',
}

const Status = styled.p`
  margin-top: 12px;
`

const DropzoneContents = () => {
  const { transferStatus, statusText } = useContext(uploadContext);

  const text = {
    STATUS_IDLE: <><IconUpload /><br /><Status>Drag images here to upload, or click to select files.</Status></>,
    STATUS_ACTIVE: 'Uploading...',
    STATUS_SUCCESS: <IconSuccess />,
    STATUS_ERROR: <><IconError /><br /><Status>{statusText}</Status></>,
  }

  const transitions = useTransition(transferStatus, transferStatus, {
    from: { opacity: 0, ...commonStyles },
    enter: { opacity: 1, ...commonStyles },
    leave: { opacity: 0, ...commonStyles },
    unique: true,
  })

  return transitions.map(({ item, props, key }) => 
    <animated.div key={key} style={props}>{text[item]}</animated.div>)
}

export default DropzoneContents;