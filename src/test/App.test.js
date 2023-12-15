import { render, screen } from '@testing-library/react';
import App from '../pages/App';

test('get app title', () => {
  render(<App />);
  const linkElement = screen.getByRole(/URL Shortner/i, { hidden: true });
  expect(linkElement).toBeInTheDocument();
});
