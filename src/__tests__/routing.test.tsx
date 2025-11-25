import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '../App';

function renderWithRouter(initialEntries: string[]) {
  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: <App />,
      },
    ],
    { initialEntries },
  );

  return render(<RouterProvider router={router} />);
}

describe('Routing', () => {
  it('navigates to alerts list on root', () => {
    renderWithRouter(['/']);
    expect(screen.getByText(/alerts/i)).not.toBeNull();
  });
});
