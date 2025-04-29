// src/App.jsx
import React from 'react';
import { Layout } from 'antd';
import UsersListPage from './pages/UsersListPage.jsx';
import logo from './assets/logoFlexxus.png';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Cabecera con logo */}
      <Header style={{
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        width: '100%',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      }}>
        <img
          src={logo}
          alt="Flexxus Logo"
          style={{ height: '40px' }}
        />
      </Header>

      {/* Contenido central con margin izquierdo, derecho y bottom */}
      <Content style={{
        margin: '0 80px 80px',
        padding: '24px',
        backgroundColor: '#fff'
      }}>
        <UsersListPage />
      </Content>
    </Layout>
  );
}

export default App;