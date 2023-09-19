import React from 'react';
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
 // Importar createRoot desde react-dom
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root')); // Crear un root usando createRoot

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

