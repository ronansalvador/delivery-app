import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
