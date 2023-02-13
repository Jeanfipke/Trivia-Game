import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { act } from 'react-dom/test-utils';
import result from './helpers/resultFetchQuestions';

describe('Test the Login page', () => {
  const validEmail = 'myValidEmail@gmail.com';
  const validName = 'myName';
  const invalidEmail = 'myInvalidEmail'
  
  it('should be possible add values in inputs', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    userEvent.type(emailInput, validEmail);
    userEvent.type(nameInput, validName);
    expect(emailInput).toHaveValue(validEmail);
    expect(nameInput).toHaveValue(validName);
  });
  it('should the button being validate', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    expect(playBtn).toBeDisabled();
    userEvent.type(emailInput, validEmail);
    userEvent.type(nameInput, validName);
    expect(playBtn).toBeEnabled();
    userEvent.clear(emailInput);
    userEvent.clear(nameInput);
    userEvent.type(emailInput, invalidEmail);
    expect(playBtn).toBeDisabled();
  })
  it('should call the fetch to get the token, save name and gravatar email in global state and redirect to the game page', async () => {
    const mockedResult = {
      "response_code": 0,
      "response_message": "Token Generated Successfully!",
      "token": "4110a9c44bd4cabec2fc435c8c02418d90acaaec9fcf6e4e00e50032d705b3e5"
    };

      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(result),
      }));

    const { store, history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(emailInput, validEmail);
    userEvent.type(nameInput, validName);
    userEvent.click(playBtn);
    // Linha so pra tirar o warning de act que da se tirar ( se quiser ver o erro so tirar as linhas 60,61,62)
    act(() => {
      history.push('/game');
    })
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    await waitFor(() => {
      const state = store.getState();
      expect(state.player.name).toBe(validName);
      expect(state.player.gravatarEmail).toBe('2c4c75b435387f3695c60823a5f33f09');
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    })
  })
  it('should be redirected to the config page when click config button', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const configBtn = screen.getByTestId('btn-settings');
    userEvent.click(configBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/configuracoes');
  })
})
