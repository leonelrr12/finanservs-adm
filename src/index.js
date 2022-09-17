// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// React +18
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';


const divRoot = document.querySelector('#root');
if(divRoot) {
  const root = createRoot( divRoot );

  root.render(
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  );
}
