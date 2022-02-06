import { render, screen } from '@testing-library/react';
import App from './App';

test('renders', () => {
  render(<App />);
  const header = screen.getByText(/beer/i);
  const body = screen.getByText(/info/i);
  expect(header).toBeInTheDocument();
  expect(body).toBeInTheDocument();
});
