import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styled from 'styled-components';

import Dropzone from './Dropzone';
import DropzoneContents from './DropzoneContents';
import ProgressRing from './ProgressRing';

import uploadContext from '../context/uploadContext';
import { STATUS_IDLE } from '../constants/uploadStatuses';

const UploadContainer = styled.div`
  position: relative;

  height: 320px;

  padding: 12px 48px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const {
    setPercentFromProgress,
    setTransferActive,
    setTransferError,
    setTransferSuccess,
    resetTransfer,
    transferState
  } = useContext(uploadContext);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    let fd = new FormData();

    acceptedFiles.forEach(file => fd.append('file', file));

    setTransferActive();

    if (acceptedFiles.length > 0) {
      axios
        .post('http://localhost:3000/upload/file', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: setPercentFromProgress,
        })
        .then(response => {
          setTransferSuccess(response);
          setTimeout(resetTransfer, 4000);
        })
        .catch(error => {
          setTransferError(error);
        });
    } else if (rejectedFiles.length > 0) {
      setTransferError(`One or more files can't be uploaded. Make sure your photos are PNG or JPEG files, and are no larger than 4mb.`);
      setTimeout(resetTransfer, 4000);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize: 4 * 1024 * 1024,
  });

  return (
    <UploadContainer>
    <Dropzone {...getRootProps({ isDragActive })}>
      <input
        {...getInputProps({
          name: 'file',
          type: 'file',
          multiple: true,
        })}
      />
      <DropzoneContents />
    </Dropzone>
    <ProgressRing />
    </UploadContainer>
  );
};
