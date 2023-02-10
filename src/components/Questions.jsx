import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
  };

  handleClick = () => {
    this.showAnswers();
  };

  render() {
    const { questions, currQuestion, shuffleAnswers, timerOver, timer } = this.props;
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
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[0]) }
              className="question-btn"
              disabled={ timerOver }
            >
              {shuffleAnswers[0]}
            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[1]) }
              className="question-btn"
              disabled={ timerOver }
            >
              {shuffleAnswers[1]}

            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[2]) }
              className="question-btn"
              disabled={ timerOver }
            >
              {shuffleAnswers[2]}

            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[3]) }
              className="question-btn"
              disabled={ timerOver }
            >
              {shuffleAnswers[3]}

            </button>
          </div>
        ) : (
          // Se for uma boolean ela retorna esse formato de questão
          <div data-testid="answer-options">
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[0]) }
              className="question-btn"
              disabled={ timerOver }
            >
              {shuffleAnswers[0]}
            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ this.dataTestIdResponsive(shuffleAnswers[1]) }
              className="question-btn"
              disabled={ timerOver }
            >
              {shuffleAnswers[1]}
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
  })).isRequired,
  shuffleAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  timerOver: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Questions;
