import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styled from 'styled-components';

import Dropzone from './Dropzone';
import DropzoneContents from './DropzoneContents';
import ProgressRing from './ProgressRing';

import uploadContext from '../context/uploadContext';

const UploadContainer = styled.div`
  position: relative;

  height: 320px;

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
      setTransferError('Images only!');
      setTimeout(resetTransfer, 4000);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
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
