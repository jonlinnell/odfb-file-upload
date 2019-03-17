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

const DropzoneContents = () => {
  const { transferStatus, statusText } = useContext(uploadContext);

  const text = {
    STATUS_IDLE: <IconUpload />,
    STATUS_ACTIVE: 'Uploading...',
    STATUS_SUCCESS: <IconSuccess />,
    STATUS_ERROR: <><IconError /><br />{statusText}</>,
  }

  const transitions = useTransition(transferStatus, transferStatus, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1, position: 'absolute' },
    leave: { opacity: 0, position: 'absolute' },
    unique: true,
  })

  return transitions.map(({ item, props, key }) => 
    <animated.div key={key} style={props}>{text[item]}</animated.div>)
}

export default DropzoneContents;