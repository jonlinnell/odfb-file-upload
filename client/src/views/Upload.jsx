import React from 'react';

import Section from '../components/Section';
import FileUpload from '../components/FileUpload';
import LboroLogo from '../svgs/LboroLogo';

const UploadView = () => {
  return (
    <>
    <Section style={{ paddingBottom: '7vh' }}>
      <h1>Venture Crawl 2019 Photos</h1>
      <aside>Share your photos from VC19!</aside>
    </Section>
    <FileUpload />
    <Section style={{ paddingTop: '7vh' }}>
      <LboroLogo width={120} fill="#FFFFFF" />
    </Section>
    </>
  );
};

export default UploadView;
