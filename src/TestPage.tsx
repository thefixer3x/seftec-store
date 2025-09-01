import React from 'react';

const TestPage = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>🔧 Debug Test Page</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#0066cc' }}>✅ React is Working</h2>
        <p>If you can see this page, React is rendering properly.</p>
        
        <div style={{ marginTop: '20px' }}>
          <h3>🌐 SeftecHub Status:</h3>
          <ul>
            <li>✅ Port 9994 Active</li>
            <li>✅ Vite Development Server Running</li>
            <li>✅ Build Process Successful</li>
            <li>✅ TypeScript Compilation Working</li>
          </ul>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px'
        }}>
          <h4>🔍 Next Steps:</h4>
          <ol>
            <li>Check browser console for JavaScript errors</li>
            <li>Verify CSS is loading properly</li>
            <li>Test main application components</li>
          </ol>
        </div>

        <button 
          onClick={() => alert('Button works! JavaScript is functioning.')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test JavaScript Functionality
        </button>
      </div>
    </div>
  );
};

export default TestPage;