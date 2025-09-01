import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>🚀 SeftechHub Debug</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#0066cc' }}>✅ React is Working!</h2>
        <p>If you can see this page, React is rendering properly.</p>
        
        <div style={{ marginTop: '20px' }}>
          <h3>🎯 SeftechHub Status:</h3>
          <ul>
            <li>✅ HTML Loading</li>
            <li>✅ JavaScript Executing</li>
            <li>✅ React Rendering</li>
            <li>✅ Public URL Active</li>
          </ul>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#e8f5e8',
          border: '1px solid #4caf50',
          borderRadius: '4px'
        }}>
          <h4>🌐 Public URL Working:</h4>
          <p><strong>https://440284790815.ngrok-free.app</strong></p>
          <p>React app is successfully rendering through ngrok tunnel!</p>
        </div>
      </div>
    </div>
  );
}

export default App;