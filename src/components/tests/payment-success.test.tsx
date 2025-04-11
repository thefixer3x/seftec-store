
/// <reference types="jest" />

// FIXED: Added jest-dom import for extended matchers
import '@testing-library/jest-dom';

// Basic test file for PaymentSuccess component
// This serves as a template for implementing more tests

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PaymentSuccess from '@/pages/PaymentSuccess';

// Mock the useSearchParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [
    new URLSearchParams({ session_id: 'test_session_123' }),
    jest.fn()
  ]
}));

describe('PaymentSuccess Component', () => {
  it('renders success message', () => {
    render(
      <BrowserRouter>
        <PaymentSuccess />
      </BrowserRouter>
    );
    
    // Check if success message is displayed
    expect(screen.getByText(/Payment Successful!/i)).toBeInTheDocument();
  });
  
  it('displays the session ID', () => {
    render(
      <BrowserRouter>
        <PaymentSuccess />
      </BrowserRouter>
    );
    
    // Check if session ID is displayed
    expect(screen.getByText(/test_session_123/i)).toBeInTheDocument();
  });
  
  it('includes navigation buttons', () => {
    render(
      <BrowserRouter>
        <PaymentSuccess />
      </BrowserRouter>
    );
    
    // Check if navigation buttons are present
    expect(screen.getByText(/Return to Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue Shopping/i)).toBeInTheDocument();
  });
});
