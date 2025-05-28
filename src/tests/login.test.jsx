import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/pages/Login';
import { useAuth } from '../context/AuthContext';
import { httpRequest } from '../services/httpRequests';
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import { describe, it, expect } from '@jest/globals';
import * as Router from 'react-router-dom';
jest.mock('../services/httpRequests');
jest.mock('../context/AuthContext');
// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));

describe('Login Component', () => {
  it('logs in successfully and calls login()', async () => {
    const mockLogin = jest.fn();
    const mockToken = 'fake-jwt-token';

    useAuth.mockReturnValue({ login: mockLogin });

    httpRequest.mockResolvedValue({
      status: 200,
      data: { token: mockToken, email: 'asadi@gmail.com' },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { email: 'asadi@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { password: '09120836682' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        currentUser: { token: mockToken, email: 'asadi@gmail.com' },
      });
    });

    expect(localStorage.getItem('token')).toBe(mockToken);
    console.log(localStorage.getItem('token'));
  });

  it('shows error on failed login', async () => {
    useAuth.mockReturnValue({ login: jest.fn() });
    httpRequest.mockRejectedValue(new Error('Invalid credentials'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { email: 'sheyda@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { password: '12345' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
