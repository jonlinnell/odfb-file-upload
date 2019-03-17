import React from 'react';

import Section from '../components/Section';
import Uploader from '../components/Uploader';
import LboroLogo from '../svgs/LboroLogo';

const UploadView = () => {
  return (
    <>
    <Section style={{ paddingBottom: '7vh' }}>
      <h1>Venture Crawl 2019 Photos</h1>
      <aside>Share your photos from VC19!</aside>
    </Section>
    <Uploader />
    <Section style={{ paddingTop: '7vh' }}>
      <LboroLogo width={120} fill="#FFFFFF" />
    </Section>
    </>
  );
};

export default UploadView;
