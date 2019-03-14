import React from 'react';
import { render } from 'react-dom';

import GlobalStyle from './styles/GlobalStyle';

import UploadView from './views/Upload';

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <UploadView />
  </React.Fragment>
)

render(<App />, document.getElementById('root'));
