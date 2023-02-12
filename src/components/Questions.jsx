import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeNextVisibility, sumAssertions, sumPoints } from '../redux/actions';
import './Questions.css';

class Questions extends Component {
  // Função para tornar o data-testid responsivo

  componentDidUpdate() {
    const { timerOver } = this.props;
    if (timerOver) this.showAnswers();
  }

  dataTestIdResponsive = (answer) => {
    const { questions, currQuestion } = this.props;
    if (answer === questions[currQuestion].correct_answer) {
      return 'correct-answer';
    }
    const findIncorrectAnswerIndex = questions[currQuestion]
      .incorrect_answers.findIndex((incorrect) => incorrect === answer);
    return `wrong-answer-${findIncorrectAnswerIndex}`;
  };

  showAnswers = () => {
    const { questions, currQuestion } = this.props;
    const buttons = document.querySelectorAll('.question-btn');
    buttons.forEach((button) => {
      if (button.textContent === questions[currQuestion].correct_answer) {
        button.classList.add('correct-answer');
      } else {
        button.classList.add('wrong-answer');
      }
    });
    const { dispatch } = this.props;
    dispatch(changeNextVisibility(true));
  };

  handleClick = ({ target }) => {
    this.showAnswers();
    const { timer, questions, currQuestion, dispatch,
      handleChoicedQuestion } = this.props;
    handleChoicedQuestion();
    if (target.className === 'question-btn correct-answer') {
      let dificultyPoints;
      const hard = 3;
      const medium = 2;
      const easy = 1;
      switch (questions[currQuestion].difficulty) {
      case 'hard':
        dificultyPoints = hard;
        break;
      case 'medium':
        dificultyPoints = medium;
        break;
      case 'easy':
        dificultyPoints = easy;
        break;

      default:
        break;
      }
      const initialPoints = 10;
      const points = initialPoints + (timer * dificultyPoints);
      dispatch(sumPoints(points));
      dispatch(sumAssertions());
    }
  };

  render() {
    const { questions, currQuestion, shuffleAnswers, timerOver, timer,
      isChoiced } = this.props;
    if (questions.length === 0 || shuffleAnswers.length === 0) return 'loading...';
    return (
      <div data-testid="answer-options">
        <p data-testid="question-category">{questions[currQuestion].category}</p>
        <p data-testid="question-text">{questions[currQuestion].question}</p>
        {/* Se for uma multipla escolha tem essa estrutura */}
        { questions[currQuestion].type === 'multiple' ? (
          <div>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][0]) }
              className="question-btn"
              disabled={ isChoiced || timerOver }
            >
              {shuffleAnswers[currQuestion][0]}
            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][1]) }
              className="question-btn"
              disabled={ isChoiced || timerOver }
            >
              {shuffleAnswers[currQuestion][1]}

            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][2]) }
              className="question-btn"
              disabled={ isChoiced || timerOver }
            >
              {shuffleAnswers[currQuestion][2]}

            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][3]) }
              className="question-btn"
              disabled={ isChoiced || timerOver }
            >
              {shuffleAnswers[currQuestion][3]}

            </button>
          </div>
        ) : (
          // Se for uma boolean ela retorna esse formato de questão
          <div data-testid="answer-options">
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][0]) }
              className="question-btn"
              disabled={ isChoiced || timerOver }
            >
              {shuffleAnswers[currQuestion][0]}
            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][1]) }
              className="question-btn"
              disabled={ isChoiced || timerOver }
            >
              {shuffleAnswers[currQuestion][1]}
            </button>
          </div>
        )}
        <p>{ timer }</p>
      </div>
    );
  }
}

Questions.propTypes = {
  currQuestion: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
  })).isRequired,
  shuffleAnswers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  timerOver: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  isChoiced: PropTypes.bool.isRequired,
  handleChoicedQuestion: PropTypes.func.isRequired,
};

export default connect()(Questions);
