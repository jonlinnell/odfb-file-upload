import React from 'react';

import Section from '../components/Section';
import ProgressRing from '../components/ProgressRing';
import UploadInput from '../components/UploadInput';

const UploadView = () => {
  return (
    <Section>
      <UploadInput />
      <ProgressRing />
    </Section>
  );
};

export default UploadView;
