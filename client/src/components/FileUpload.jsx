import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styled from 'styled-components';

import Dropzone from './Dropzone';
import DropzoneContents from './DropzoneContents';
import ProgressRing from './ProgressRing';

import uploadContext from '../context/uploadContext';

const { API } = process.env;

const maxSize = 4 * 1024 ** 2;

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
    consent
  } = useContext(uploadContext);

  let source;

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    let fd = new FormData();
    acceptedFiles.forEach(file => fd.append('file', file));

    const CancelToken = axios.CancelToken;

    if (!consent) {
      setTransferError('Please agree to the Ts & Cs below.');
      setTimeout(resetTransfer, 4000);
    } else if (acceptedFiles.length > 0) {
      if (source) {
        source.cancel('New upload started.');
      }

      setTimeout(() => setTransferActive(), 500);
      source = CancelToken.source()

      axios
        .post(`${API}/upload/file`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: setPercentFromProgress,
          cancelToken: source.token
        })
        .then(response => {
          setTransferSuccess(response);
          setTimeout(resetTransfer, 4000);
          source = undefined;
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            resetTransfer(true);
          } else {
            setTransferError(error);
            setTimeout(resetTransfer, 4000);
          }
        });
    } else if (rejectedFiles.length > 0) {
      if (!source) {
        setTransferError(`One or more files can't be uploaded. Make sure your photos are PNG or JPEG files, and are no larger than ${maxSize / 1024 ** 2}mb.`);
        setTimeout(resetTransfer, 4000);
      }
    }
  }, [consent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize
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
