import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('checks click on login button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
  fireEvent.click(buttonElement)
});

