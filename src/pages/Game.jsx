import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { changeNextVisibility } from '../redux/actions';

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
    const { timer } = this.state;
    if (timer > 0) {
      this.setState({ timer: timer - 1 });
    } else {
      this.setState({ timerOver: true });
      clearInterval(this.count);
    }
  };

  // tive que puxar pra ca essa logica de mudar o estado que define se eu ja selecionei alguma questão, pra poder zerar quando clickar em próximo
  handleChoicedQuestion = () => {
    this.setState({ isChoiced: true });
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
    const { isNextVisible } = this.props;
    return (
      <div>
        <Header />
        <Questions
          questions={ questions }
          currQuestion={ currQuestion }
          shuffleAnswers={ shuffleAnswers }
          timerOver={ timerOver }
          timer={ timer }
          handleChoicedQuestion={ this.handleChoicedQuestion }
          isChoiced={ isChoiced }
        />
        { isNextVisible && (
          <button
            data-testid="btn-next"
            onClick={ this.handleClickNext }
          >
            Próxima
          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isNextVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  isNextVisible: globalState.player.isNextVisible,
  name: globalState.player.name,
  score: globalState.player.score,
  gravatarEmail: globalState.player.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
