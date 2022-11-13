import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [termsHistory, setTermsHistory] = useState([]);
  const [autoCompleteVisibility, setAutoCompleteVisibility] = useState(false);
  const [autoCompleteLength, setAutoCompleteLength] = useState(0);

  return (
    <StateContext.Provider value={{
      searchTerm, setSearchTerm, termsHistory, setTermsHistory, autoCompleteVisibility, setAutoCompleteVisibility,
      autoCompleteLength, setAutoCompleteLength
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);