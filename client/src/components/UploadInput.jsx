import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import Dropzone from '../components/Dropzone';
import IconUpload from '../icons/IconUpload';

import uploadContext from '../context/uploadContext';

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
  );
};
