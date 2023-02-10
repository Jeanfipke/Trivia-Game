import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Questions extends Component {
  // Função para tornar o data-testid responsivo
  dataTestIdResponsive = (answer) => {
    const { questions, currQuestion } = this.props;
    if (answer === questions[currQuestion].correct_answer) {
      return 'correct-answer';
    }
    const findIncorrectAnswerIndex = questions[currQuestion]
      .incorrect_answers.findIndex((incorrect) => incorrect === answer);
    return `wrong-answer-${findIncorrectAnswerIndex}`;
  };

  render() {
    const { questions, currQuestion, shuffleAnswers } = this.props;
    if (questions.length === 0 || shuffleAnswers.length === 0) return 'loading...';
    return (
      <div data-testid="answer-options">
        <p data-testid="question-category">{questions[currQuestion].category}</p>
        <p data-testid="question-text">{questions[currQuestion].question}</p>
        {/* Se for uma multipla escolha tem essa estrutura */}
        { questions[currQuestion].type === 'multiple' ? (
          <div>
            <button data-testid={ this.dataTestIdResponsive(shuffleAnswers[0]) }>
              {shuffleAnswers[0]}
            </button>
            <button data-testid={ this.dataTestIdResponsive(shuffleAnswers[1]) }>
              {shuffleAnswers[1]}

            </button>
            <button data-testid={ this.dataTestIdResponsive(shuffleAnswers[2]) }>
              {shuffleAnswers[2]}

            </button>
            <button data-testid={ this.dataTestIdResponsive(shuffleAnswers[3]) }>
              {shuffleAnswers[3]}

            </button>
          </div>
        ) : (
          // Se for uma boolean ela retorna esse formato de questão
          <div data-testid="answer-options">
            <button data-testid={ this.dataTestIdResponsive(shuffleAnswers[0]) }>
              {shuffleAnswers[0]}
            </button>
            <button data-testid={ this.dataTestIdResponsive(shuffleAnswers[1]) }>
              {shuffleAnswers[1]}
            </button>
          </div>
        )}
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
};

export default Questions;
