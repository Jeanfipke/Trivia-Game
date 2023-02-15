import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Questions.css';
import timerIco from '../images/timer.svg';
import logoTrivia from '../images/logo trivia.svg';
import logoTrybe from '../images/ícone trybe.svg';

class Questions extends Component {
  componentDidUpdate() {
    const { timerOver, showAnswers } = this.props;
    if (timerOver) showAnswers();
  }

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
    const { questions, currQuestion, shuffleAnswers, timerOver, timer,
      isChoiced, isNextVisible, handleClickNext, handleClickQuestion } = this.props;
    if (questions.length === 0 || shuffleAnswers.length === 0) return 'loading...';
    return (
      <div className="main-questions" data-testid="main-game">
        <div className="test">
          <img className="logo-trivia-game" src={ logoTrivia } alt="trivia logo" />
          <div className="question-div">
            <p
              className="question-category"
              data-testid="question-category"
            >
              {questions[currQuestion].category}
            </p>
            <p
              className="question-text"
              data-testid="question-text"
            >
              {questions[currQuestion].question}
            </p>
            <p className="timer">
              <img src={ timerIco } alt="timer icon" />
              Tempo:
              {' '}
              { timer }
            </p>
          </div>
          <img src={ logoTrybe } alt="trybe logo" />
        </div>
        {/* Se for uma multipla escolha tem essa estrutura */}
        <div className="answer-options">
          { questions[currQuestion].type === 'multiple' ? (
            <>
              <button
                onClick={ handleClickQuestion }
                data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][0]) }
                className="question-btn"
                disabled={ isChoiced || timerOver }
              >
                {shuffleAnswers[currQuestion][0]}
              </button>
              <button
                onClick={ handleClickQuestion }
                data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][1]) }
                className="question-btn"
                disabled={ isChoiced || timerOver }
              >
                {shuffleAnswers[currQuestion][1]}

              </button>
              <button
                onClick={ handleClickQuestion }
                data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][2]) }
                className="question-btn"
                disabled={ isChoiced || timerOver }
              >
                {shuffleAnswers[currQuestion][2]}

              </button>
              <button
                onClick={ handleClickQuestion }
                data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][3]) }
                className="question-btn"
                disabled={ isChoiced || timerOver }
              >
                {shuffleAnswers[currQuestion][3]}

              </button>
            </>
          ) : (
          // Se for uma boolean ela retorna esse formato de questão
            <div data-testid="answer-options">
              <button
                onClick={ handleClickQuestion }
                data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][0]) }
                className="question-btn"
                disabled={ isChoiced || timerOver }
              >
                {shuffleAnswers[currQuestion][0]}
              </button>
              <button
                onClick={ handleClickQuestion }
                data-testid={ this.dataTestIdResponsive(shuffleAnswers[currQuestion][1]) }
                className="question-btn"
                disabled={ isChoiced || timerOver }
              >
                {shuffleAnswers[currQuestion][1]}
              </button>
            </div>
          )}
          { isNextVisible && (
            <button
              className="next-btn"
              data-testid="btn-next"
              onClick={ handleClickNext }
            >
              PRÓXIMA
            </button>
          )}
        </div>
        <div className="footer" />
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
  isChoiced: PropTypes.bool.isRequired,
  isNextVisible: PropTypes.bool.isRequired,
  showAnswers: PropTypes.func.isRequired,
  handleClickNext: PropTypes.func.isRequired,
  handleClickQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  isNextVisible: globalState.player.isNextVisible,
});

export default connect(mapStateToProps)(Questions);
