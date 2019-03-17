import React, { useState, useEffect, createContext } from 'react';

const uploadContext = createContext();

const UploadProvider = ({ children }) => {
  const [percent, setPercent] = useState(0);
  const [transferStatus, setTransferStatus] = useState('idle');

  const setPercentFromProgress = progressEvent =>
    setPercent(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));

  const setTransferSuccess = () => {
    setTransferStatus('success');
    setTimeout(() => {
      setTransferStatus('idle');
      setPercent(0);
    }, 7000);
  };

  return (
    <uploadContext.Provider
      value={{
        percent,
        transferStatus,
        setTransferStatus,
        setTransferSuccess,
        setPercentFromProgress,
      }}
    >
      {children}
    </uploadContext.Provider>
  );
};

export default uploadContext;

export { UploadProvider };
