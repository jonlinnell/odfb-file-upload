import React, { useContext } from 'react';

import Section from '../components/Section';
import FileUpload from '../components/FileUpload';
import LboroLogo from '../svgs/LboroLogo';
import Footer from '../components/Footer'
import {
  ConsentHeader,
  ConsentAside,
  ConsentTermsList,
  ConsentTerm,
  ConsentLabel
} from '../components/Consent'

import uploadContext from '../context/uploadContext';

const UploadView = () => {
  const { consent, setConsent } = useContext(uploadContext);

  return (
    <>
    <Section style={{ marginBottom: '7vh' }}>
      <h1>Venture Crawl 2019 Photos</h1>
      <aside>Share your photos from VC19!</aside>
    </Section>
    <Section style={{ marginBottom: '7vh' }}>
      <ConsentHeader>Ts & Cs</ConsentHeader>
        <ConsentAside>By uploading photos, you agree to the following terms:</ConsentAside>
        <ConsentTermsList>
          <ConsentTerm>Photographs submitted may be displayed publicly during the event,</ConsentTerm>
          <ConsentTerm>Photographs submitted may be used for future marketing purposes,</ConsentTerm>
          <ConsentTerm>You have the consent of the photographer to share these photos,</ConsentTerm>
          <ConsentTerm>You have the consent of any people depicted in these photos to share these photos.</ConsentTerm>
        </ConsentTermsList>
        <div style={{ marginTop: '1rem' }}>
          <input type="checkbox" name="consent" id="consent" checked={consent} onChange={() => setConsent(!consent)} />
          <ConsentLabel style={{ marginLeft: '12px' }} htmlFor='consent'>I consent to the Terms & Conditions</ConsentLabel>
        </div>
    </Section>
    <FileUpload />
    <Section style={{ marginTop: '7vh' }}>
      <LboroLogo width={180} fill="#FFFFFF" />
      <Footer>2019 Jon Linnell, Loughborough University London</Footer>
    </Section>
    </>
  );
};

export default UploadView;
