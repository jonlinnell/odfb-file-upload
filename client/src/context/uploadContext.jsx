import React, { useState, useReducer, createContext } from 'react';
import {
  STATUS_IDLE,
  STATUS_ACTIVE,
  STATUS_SUCCESS,
  STATUS_ERROR,
  STATUS_RESETTING,
} from '../constants/uploadStatuses.js';

const uploadContext = createContext();

const UploadProvider = ({ children }) => {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [consent, setConsent] = useState(false);
  const [transferStatus, dispatchStatus] = useReducer((state, action) => {
    switch (action.type) {
      case STATUS_IDLE:
        return STATUS_IDLE;
      case STATUS_ACTIVE:
        return STATUS_ACTIVE;
      case STATUS_SUCCESS:
        return STATUS_SUCCESS;
      case STATUS_ERROR:
        return STATUS_ERROR;
      case STATUS_RESETTING:
        return STATUS_RESETTING;
      default:
        return state;
    }
  }, STATUS_IDLE);

  const resetTransfer = (noAnimation) => {
    if (noAnimation) {
      dispatchStatus({ type: STATUS_IDLE });
    } else {
      dispatchStatus({ type: STATUS_RESETTING });
      setTimeout(() => {
        setPercent(0)
        setStatusText('')
        setTimeout(() => dispatchStatus({ type: STATUS_IDLE }), 350);
      }, 350)
    }
  };

  const setPercentFromProgress = progressEvent => {
    setPercent(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
  }

  const setTransferActive = () => dispatchStatus({ type: STATUS_ACTIVE });

  const setTransferError = error => {
    setPercent(100);
    dispatchStatus({ type: STATUS_ERROR });
    setStatusText(JSON.stringify(error));
  };

  const setTransferSuccess = response => {
    dispatchStatus({ type: STATUS_SUCCESS });
    setStatusText(JSON.stringify(response.body));
  };

  return (
    <uploadContext.Provider
      value={{
        percent,
        resetTransfer,
        setPercentFromProgress,
        setTransferActive,
        setTransferError,
        setTransferSuccess,
        statusText,
        transferStatus,
        consent,
        setConsent
      }}
    >
      {children}
    </uploadContext.Provider>
  );
};

export default uploadContext;

export { UploadProvider };
