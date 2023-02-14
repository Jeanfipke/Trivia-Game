import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import result from './helpers/resultFetchQuestions';


describe('test the game page', () => {
  it('should the fetch be called with the correct url', () => {
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('token', 'bdeb9f90d82f967d7f9cb86afeb0b37823046b3cfde8b40f299c778188817d02');
    act(() => {
      history.push('/game');
    })
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api.php?amount=5&token=bdeb9f90d82f967d7f9cb86afeb0b37823046b3cfde8b40f299c778188817d02');
  });

  it('should renderize the correct question, category, options', async() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(result),
    });

    renderWithRouterAndRedux(<App />, undefined, '/game');
    
    expect(global.fetch).toHaveBeenCalled();

    const nextBtnBeforeClick = screen.queryByText(/Próxima/i);
    expect(nextBtnBeforeClick).not.toBeInTheDocument();
    const category = await screen.findByText(/Entertainment: Music/i);
    expect(category).toBeInTheDocument();
    const questions = screen.getByText('What French artist/band is known for playing on the midi instrument &quot;Launchpad&quot;?');
    expect(questions).toBeInTheDocument();
    const allBtns = screen.getAllByRole('button');
    expect(allBtns).toHaveLength(4);
    const answers = ['Madeon', 'Daft Punk', 'Disclosure', 'David Guetta'];
    answers.forEach((answer) => {
      expect(screen.getByText(answer)).toBeInTheDocument();
    });
    userEvent.click(screen.getByText(answers[0]));
    const nextBtnAfterClick = screen.queryByText(/Próxima/i);
    expect(nextBtnAfterClick).toBeInTheDocument();
  });

  it('should the next button works correctly', async() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(result),
    });

    renderWithRouterAndRedux(<App />, undefined, '/game');
    
    expect(global.fetch).toHaveBeenCalled();

    // 1 questão
    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextBtn = screen.getByTestId('btn-next');
    userEvent.click(nextBtn);

    // 2 questão
    const nextBtnBeforeClick = screen.queryByText(/Próxima/i);
    expect(nextBtnBeforeClick).not.toBeInTheDocument();
    const category = await screen.findByText(/Geography/i);
    expect(category).toBeInTheDocument();
    const questions = screen.getByText('Which country does Austria not border?');
    expect(questions).toBeInTheDocument();
    const allBtns = screen.getAllByRole('button');
    expect(allBtns).toHaveLength(4);
    const answers = ['France', 'Slovenia', 'Switzerland', 'Slovakia'];
    answers.forEach((answer) => {
      expect(screen.getByText(answer)).toBeInTheDocument();
    });
    userEvent.click(screen.getByText(answers[0]));
    const nextBtnAfterClick = screen.queryByText(/Próxima/i);
    expect(nextBtnAfterClick).toBeInTheDocument();

    expect(screen.getByText(answers[0])).not.toHaveStyle('border: 3px solid rgb(6, 240, 15)');
    expect(screen.getByText(answers[0])).not.toHaveStyle('border: 3px solid red');

    // 3 questão
    userEvent.click(nextBtnAfterClick);
    const correctAnswer2 = screen.getByTestId('correct-answer')
    
    const allBtns2 = screen.getAllByRole('button');
    expect(allBtns2).toHaveLength(2);
  });


  it('should show in the ranking the result after a game', async() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(result),
    });

    const INITIAL_STATE = {
      player:{
        name: 'Rebeca',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
        isNextVisible: false,
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    localStorage.clear();

    for(let i = 1; i <= 5 ; i += 1 ) {
      const wrongAnswer = await screen.findByTestId('wrong-answer-0');
      userEvent.click(wrongAnswer);
      const nextBtn = screen.getByTestId('btn-next');
      userEvent.click(nextBtn);
    }
    
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');

    const rankingBtn1 = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn1);
    const name = await screen.findByText('Rebeca');
    expect(name).toBeInTheDocument();
    const score = screen.getByTestId('player-score-0');
    expect(score).toHaveTextContent('0');
    const goHome = screen.getByTestId('btn-go-home');
    userEvent.click(goHome);

    act(() => {
      history.push('/game');
    });

    for(let i = 1; i <= 5 ; i += 1 ) {
      const correctAnswer = await screen.findByTestId('correct-answer');
      userEvent.click(correctAnswer);
      const nextBtn = screen.getByTestId('btn-next');
      userEvent.click(nextBtn);
    }
    const rankingBtn2 = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn2);
    const scorePlayerMorePoints =  screen.getByTestId('player-score-0')
    expect(scorePlayerMorePoints).toHaveTextContent('320');
    const scorePlayerLessPoints = screen.getByTestId('player-score-1')
    expect(scorePlayerLessPoints).toHaveTextContent('0');
  })
})