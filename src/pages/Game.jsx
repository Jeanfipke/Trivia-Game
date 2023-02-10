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
        console.log(data);
        if (data.response_code === 0) {
          this.setState({ questions: data.results }, this.handleSuffleAnswers);
          return;
        }
        localStorage.removeItem('token');
        history.push('/');
      });
  }

  handleSuffleAnswers = () => {
    const { questions, currQuestion } = this.state;
    const answers = [...questions[currQuestion].incorrect_answers,
      questions[currQuestion].correct_answer];
    const bla = 0.5;
    const shuffleAnswers = answers.sort(() => Math.random() - bla);
    this.setState({ shuffleAnswers });
  };

  render() {
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
