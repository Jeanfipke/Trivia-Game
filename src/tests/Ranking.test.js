import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('test the ranking page', () => {
  const INITIAL_STATE1 = {
    player: {
      name: 'Madeline Charles',
      assertions: 2,
      score: 107,
      gravatarEmail: 'a60275348d3c50aca17234a5f8f6ebba',
      isNextVisible: false
    }
  }
  it('should have the button to initial page and works', () => {
    const { store, history } = renderWithRouterAndRedux(<App />, INITIAL_STATE1)

    localStorage.setItem('ranking', JSON.stringify([{ name: '', }]));
    act(() => {
      history.push('/ranking')
    })
    const goHomeBtn = screen.getByTestId('btn-go-home');
    expect(goHomeBtn).toBeInTheDocument();
    userEvent.click(goHomeBtn);
    const state = store.getState();
    expect(state.player.score).toBe(0);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    

  })
})