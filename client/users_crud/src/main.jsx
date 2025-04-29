import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UsersProvider } from './context/UserContext.jsx';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider>
  </React.StrictMode>
);