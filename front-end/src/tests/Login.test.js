// import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste da GetStarted', () => {
  test('Se o título esta na página', () => {
    renderWithRouter(<App/>);
    screen.logTestingPlaygroundURL();
  });
});
