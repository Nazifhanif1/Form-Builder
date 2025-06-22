import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailElement from './EmailElement';

test('renders email input and validates incorrect email', () => {
  render(<EmailElement />);
  const input = screen.getByPlaceholderText(/email/i);
  fireEvent.change(input, { target: { value: 'invalid' } });
  fireEvent.blur(input);
  expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
});

test('renders email input and validates correct email', () => {
  render(<EmailElement />);
  const input = screen.getByPlaceholderText(/email/i);
  fireEvent.change(input, { target: { value: 'test@email.com' } });
  fireEvent.blur(input);
  expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument();
});