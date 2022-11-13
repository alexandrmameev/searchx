import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { StateContextProvider } from './context/StateContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateContextProvider>
);