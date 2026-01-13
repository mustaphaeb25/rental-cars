// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client'; // <--- Add this import!
// import './styles/NewGlobal.css';
// import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // Note: BrowserRouter is now handled only in main.jsx, not App.jsx
// // So, the BrowserRouter import and usage here is correct as per our previous fix.
// import { BrowserRouter } from 'react-router-dom';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 1. Third-party CSS first
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Custom global CSS last (to allow overrides)
import './styles/global.css'; 

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);