import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Section from '../components/Section';
import axios from 'axios';

const UploadView = () => {
  const onDrop = useCallback(acceptedFiles => {
    let fd = new FormData();
    let uploads = [];

    acceptedFiles.map(file =>
      fd.append('file', file)
    );

    axios.post('http://localhost:3000/upload/file', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    Promise.all(uploads).then(values => console.log(values));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Section>
      <h1>Test Upload Form</h1>
      <div {...getRootProps()}>
        <input name="file" type="file" multiple {...getInputProps()} />
        {isDragActive ? (
          <p>Oooh drop that file!</p>
        ) : (
          <p>Drag some files here, or click to open the upload window.</p>
          )}
      </div>
    </Section>
  );
};

export default UploadView;
