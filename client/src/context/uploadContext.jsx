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
  const [transferStatus, dispatch] = useReducer((state, action) => {
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

  const resetTransfer = () => {
    dispatch({ type: STATUS_RESETTING });
    setTimeout(() => {
      setPercent(0)
      setTimeout(() => dispatch({ type: STATUS_IDLE }), 500);
    }, 500)
  };

  const setPercentFromProgress = progressEvent =>
    setPercent(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));

  const setTransferActive = () => dispatch({ type: STATUS_ACTIVE });

  const setTransferError = error => {
    setPercent(100);
    dispatch({ type: STATUS_ERROR });
  };

  const setTransferSuccess = response => {
    dispatch({ type: STATUS_SUCCESS });
  };

  return (
    <uploadContext.Provider
      value={{
        percent,
        transferStatus,
        setTransferActive,
        setTransferError,
        setTransferSuccess,
        setPercentFromProgress,
        resetTransfer,
      }}
    >
      {children}
    </uploadContext.Provider>
  );
};

export default uploadContext;

export { UploadProvider };
