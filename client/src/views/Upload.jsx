import React from 'react';

import Section from '../components/Section';
import ProgressRing from '../components/ProgressRing';
import UploadInput from '../components/UploadInput';
import LboroLogo from '../svgs/LboroLogo';

const UploadView = () => {
  return (
    <>
    <Section style={{ marginBottom: '32px', textAlign: 'center' }}>
      <h1>Venture Crawl '19 Photos</h1>
      <aside>Share your photos from VC19!</aside>
    </Section>
    <Section height={320}>
      <UploadInput />
      <ProgressRing />
    </Section>
    <Section style={{ marginTop: '32px', textAlign: 'center' }}>
      <LboroLogo width={120} fill="#FFFFFF" />
    </Section>
    </>
  );
};

export default UploadView;
