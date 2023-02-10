import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  state = {
    questions: [],
    currQuestion: 0,
    shuffleAnswers: [],
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
  }

  // Função para randomizar a ordem das respostas
  handleSuffleAnswers = () => {
    const { questions, currQuestion } = this.state;
    const answers = [...questions[currQuestion].incorrect_answers,
      questions[currQuestion].correct_answer];
    const numberToRandomize = 0.5;
    const shuffleAnswers = answers.sort(() => Math.random() - numberToRandomize);
    this.setState({ shuffleAnswers });
  };

  render() {
    // currQuestion é variavel que vai capturar em qual questão estamos atraves de um index que começa com 0, questions são todas as questões
    // a ideia é que com que passemos de uma questão pra outra mudar este currQuestion para mudar a questão que está sendo renderizada
    const { questions, currQuestion, shuffleAnswers } = this.state;
    return (
      <div>
        <Header />
        <Questions
          questions={ questions }
          currQuestion={ currQuestion }
          shuffleAnswers={ shuffleAnswers }
        />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
