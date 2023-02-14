import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';

class Feedback extends Component {
  state = {
    feedback: '',
  };

  componentDidMount() {
    const { assertions } = this.props;
    const couldBeBetter = 3;
    if (assertions < couldBeBetter) {
      this.setState({ feedback: 'Could be better...' });
    } else {
      this.setState({ feedback: 'Well Done!' });
    }
  }

  handleFeedbackPageButtons = ({ target }) => {
    const { history, dispatch } = this.props;
    if (target.id === 'play-again') {
      dispatch(resetScore());
      history.push('/');
    } else {
      history.push('/ranking');
    }
  };

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    const { feedback } = this.state;
    return (
      <div>
        <h1 data-testid="feedback-text">{feedback}</h1>
        <img src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="gravat" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          // REQ 15
          data-testid="btn-play-again"
          id="play-again"
          onClick={ this.handleFeedbackPageButtons }
          type="button"
        >
          Play Again
        </button>
        <button
        // REQ 16
          data-testid="btn-ranking"
          id="ranking"
          onClick={ this.handleFeedbackPageButtons }
          type="button"
        >
          Ver ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
