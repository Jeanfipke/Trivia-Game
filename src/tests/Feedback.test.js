import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('test the feedback page', () => {
  const INITIAL_STATE1 = {
    player: {
      name: 'Madeline Charles',
      assertions: 2,
      score: 107,
      gravatarEmail: 'a60275348d3c50aca17234a5f8f6ebba',
      isNextVisible: false
    }
  }

  const INITIAL_STATE2 = {
    player: {
      name: 'Madeline Charles',
      assertions: 4,
      score: 107,
      gravatarEmail: 'a60275348d3c50aca17234a5f8f6ebba',
      isNextVisible: false
    }
  }

  it('should renderize the correct name, score, gravatar image, assertions', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE1, '/feedback');

    const score = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    const name = screen.getByTestId('header-player-name');
    const img = screen.getByTestId('header-profile-picture');

    expect(score).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    expect(score).toHaveTextContent('107');
    expect(assertions).toHaveTextContent('2');
    expect(name).toHaveTextContent('Madeline Charles');
    expect(img.src).toBe('https://www.gravatar.com/avatar/a60275348d3c50aca17234a5f8f6ebba');

  });

  it('should renderize could be better when assertions < 3', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE1, '/feedback');
    
    const feedback = screen.getByTestId('feedback-text');
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent('Could be better...');
  });

  it('should renderize well done! when assertions >= 3', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE2, '/feedback');

    const feedback = screen.getByTestId('feedback-text');
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent('Well Done!');
  });

  it('should have the play-again button, and should redirect correct', () => {
    const { store, history } = renderWithRouterAndRedux(<App />, INITIAL_STATE2, '/feedback');

    const playAgainBtn = screen.getByTestId('btn-play-again');
    expect(playAgainBtn).toBeInTheDocument();
    userEvent.click(playAgainBtn);
    const state = store.getState();
    expect(state.player.score).toBe(0);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

  });
  
  it('should have the ranking button adn redirect correct', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE2, '/feedback');

    localStorage.setItem('ranking', JSON.stringify([{ name: '', }]));
    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })
})