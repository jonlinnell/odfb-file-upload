import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styled from 'styled-components';

import Dropzone from './Dropzone';
import IconUpload from '../icons/IconUpload';
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
  const { setPercentFromProgress, setTransferStatus, setTransferSuccess } = useContext(
    uploadContext
  );

  const onDrop = useCallback((acceptedFiles) => {
    let fd = new FormData();

    acceptedFiles.forEach(file => fd.append('file', file));

    setTransferStatus('active');

    if (acceptedFiles.length > 0) {
      axios
        .post('http://localhost:3000/upload/fileDummy', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: setPercentFromProgress,
        })
        .then(response => {
          console.log(response);
          setTransferSuccess();
        })
        .catch(error => {
          console.log(error);
          setTransferStatus('error');
        });
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
      <IconUpload width={48} />
      <p>Drag files here to upload, or click here to select files...</p>
    </Dropzone>
    <ProgressRing />
    </UploadContainer>
  );
};
