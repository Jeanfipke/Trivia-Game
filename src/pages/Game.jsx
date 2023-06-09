import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { changeNextVisibility, sumAssertions, sumPoints } from '../redux/actions';
import './Game.css';

class Game extends Component {
  state = {
    questions: [],
    currQuestion: 0,
    shuffleAnswers: [],
    timer: 30,
    timerOver: false,
    isChoiced: false,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code === 0) {
          this.setState({ questions: data.results }, this.handleSuffleAnswers);
          return;
        }
        localStorage.removeItem('token');
        history.push('/');
      });
    const oneSec = 1000;
    this.count = setInterval(() => this.timerFunction(), oneSec);
  }

  timerFunction = () => {
    const { timer, isChoiced } = this.state;
    if (timer > 0 && !isChoiced) {
      this.setState({ timer: timer - 1 });
    } else if (timer <= 0 || isChoiced) {
      this.setState({ timerOver: true });
    } else {
      clearInterval(this.count);
    }
  };

  // tive que puxar pra ca essa logica de mudar o estado que define se eu ja selecionei alguma questão, pra poder zerar quando clickar em próximo
  handleChoicedQuestion = () => {
    this.setState({ isChoiced: true });
  };

  showAnswers = () => {
    const { questions, currQuestion } = this.state;
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

  handleClickQuestion = ({ target }) => {
    this.showAnswers();
    const { timer, questions, currQuestion } = this.state;
    const { dispatch } = this.props;
    this.handleChoicedQuestion();
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

      default:
        dificultyPoints = easy;
        break;
      }
      const initialPoints = 10;
      const points = initialPoints + (timer * dificultyPoints);
      dispatch(sumPoints(points));
      dispatch(sumAssertions());
    }
  };

  handleClickNext = () => {
    const { currQuestion } = this.state;
    const { history, dispatch } = this.props;
    const maxIndexQuestion = 4;
    // se for a ultima pergunta vai pra feedback
    if (currQuestion === maxIndexQuestion) {
      const { name, score, gravatarEmail } = this.props;
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const newRank = { name, score, picture: `https://www.gravatar.com/avatar/${gravatarEmail}` };
      const newRanking = ranking
        ? [...ranking, newRank].sort((a, b) => b.score - a.score) : [newRank];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      history.push('/feedback');
    }
    // voltar ao estado inicial de timer de pergunta ja escolhida etc
    this.setState({ currQuestion: currQuestion + 1,
      timer: 30,
      timerOver: false,
      isChoiced: false });
    // Retirar as cores dos botões
    const buttons = document.querySelectorAll('.question-btn');
    buttons.forEach((button) => {
      button.classList.remove('correct-answer');
      button.classList.remove('wrong-answer');
    });
    // Tornando o botão next invísivel dnv ja que mudou a questão
    dispatch(changeNextVisibility(false));
  };

  // Função para randomizar a ordem das respostas
  handleSuffleAnswers = () => {
    const { questions } = this.state;
    const shuffleAnswers = questions.map((question) => {
      const answers = [...question.incorrect_answers,
        question.correct_answer];
      const numberToRandomize = 0.5;
      return answers.sort(() => Math.random() - numberToRandomize);
    });
    this.setState({ shuffleAnswers });
  };

  render() {
    // currQuestion é variavel que vai capturar em qual questão estamos atraves de um index que começa com 0, questions são todas as questões
    // a ideia é que com que passemos de uma questão pra outra mudar este currQuestion para mudar a questão que está sendo renderizada
    const { questions, currQuestion, shuffleAnswers, timer, timerOver,
      isChoiced } = this.state;
    return (
      <div className="main-game">
        <Header />
        <div className="questions-wrap">
          <Questions
            questions={ questions }
            currQuestion={ currQuestion }
            shuffleAnswers={ shuffleAnswers }
            timerOver={ timerOver }
            timer={ timer }
            handleChoicedQuestion={ this.handleChoicedQuestion }
            isChoiced={ isChoiced }
            handleClickNext={ this.handleClickNext }
            handleClickQuestion={ this.handleClickQuestion }
            showAnswers={ this.showAnswers }
          />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  score: globalState.player.score,
  gravatarEmail: globalState.player.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
