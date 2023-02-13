import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';


describe('test the game page', () => {
  it('should the fetch be called with the correct url', () => {
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('token', 'bdeb9f90d82f967d7f9cb86afeb0b37823046b3cfde8b40f299c778188817d02');
    act(() => {
      history.push('/game');
    })
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api.php?amount=5&token=bdeb9f90d82f967d7f9cb86afeb0b37823046b3cfde8b40f299c778188817d02');
  })
})