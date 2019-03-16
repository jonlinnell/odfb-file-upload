import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import Section from '../components/Section';
import Dropzone from '../components/Dropzone';
import ProgressRing from '../components/ProgressRing';
import IconUpload from '../icons/IconUpload';

const UploadView = () => {
  const onDrop = useCallback(acceptedFiles => {
    let fd = new FormData();
    let uploads = [];

    acceptedFiles.map(file => fd.append('file', file));

    axios.post('http://localhost:3000/upload/file', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    Promise.all(uploads).then(values => console.log(values));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Section style={{ position: 'relative', top: '-160px' }}>
      <div {...getRootProps()}>
        <input name="file" type="file" multiple {...getInputProps()} />
        <ProgressRing percent={0} />
        <Dropzone isDragActive={isDragActive}>
            <IconUpload width={48} />
            <p>Drag files here to upload, or click here to select files...</p>
          </Dropzone>
      </div>
    </Section>
  );
};

export default UploadView;
