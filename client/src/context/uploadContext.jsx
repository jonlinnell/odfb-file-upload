import React, { useState, useEffect, createContext } from 'react';

const uploadContext = createContext();

const UploadProvider = ({ children }) => {
  const [percent, setPercent] = useState(0);

  const setPercentFromProgress = progressEvent => setPercent(parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ))

  return (
    <uploadContext.Provider
      value={{
        percent,
        setPercentFromProgress,
      }}
    >
      {children}
    </uploadContext.Provider>
  );
};

export default uploadContext;

export { UploadProvider };
