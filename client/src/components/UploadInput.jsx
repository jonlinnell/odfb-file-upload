import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import Dropzone from '../components/Dropzone';
import IconUpload from '../icons/IconUpload';

import uploadContext from '../context/uploadContext';

export default () => {
  const { setPercentFromProgress } = useContext(uploadContext);

  const onDrop = useCallback(acceptedFiles => {
    let fd = new FormData();

    acceptedFiles.map(file => fd.append('file', file));

    axios.post('http://localhost:3000/upload/fileDummy', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: setPercentFromProgress,
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
