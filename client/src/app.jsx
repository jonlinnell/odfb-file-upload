import React from 'react';
import { render } from 'react-dom';

import GlobalStyle from './styles/GlobalStyle';
import './styles/fonts.css';

import { UploadProvider } from './context/uploadContext';

import UploadView from './views/Upload';

const App = () => (
  <>
    <GlobalStyle />
    <UploadProvider>
      <UploadView />
    </UploadProvider>
  </>
)

render(<App />, document.getElementById('root'));
