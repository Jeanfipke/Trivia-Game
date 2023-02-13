import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import result from './helpers/resultFetchQuestions';

describe('should test the timer', () => {
  jest.setTimeout(35000);
  const INITIAL_STATE = {
    player: {
      name: '',
      assertions: 3,
      score: 3,
      gravatarEmail: '',
      isNextVisible: false,
    }
  };
  it('should the timer run correctly, and when timeover the buttons have to be disabled and show the answers', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(result),
    });
  
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
  
    const timerBeggin = await screen.findByText('30');
    expect(timerBeggin).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('0')).toBeInTheDocument(), { timeout: 30000})
    await waitFor(() => {
      const correctAnswer = screen.getByTestId('correct-answer');
      const wrongAnswer = screen.getByTestId('wrong-answer-0');
      expect(wrongAnswer).toBeDisabled();
      expect(correctAnswer).toBeDisabled();
    });
  });
})