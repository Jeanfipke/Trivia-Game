import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';
import './Feedback.css';
import triviaLogo from '../images/logo trivia.svg';

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
      <div className="feedback-main">
        <img className="trivia-logo-feedback" src={ triviaLogo } alt="trivia logo" />
        <div className="feedback-div">
          <img className="feedBack-userPic" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="gravat" data-testid="header-profile-picture" />
          <h1 className="feedback-text" data-testid="feedback-text">{feedback}</h1>
          <p style={ { display: 'none' } } data-testid="header-player-name">{name}</p>
          <p style={ { display: 'none' } } data-testid="header-score">{score}</p>
          <div style={ { display: 'flex', alignItems: 'center' } }>
            <span>{'Você acertou '}</span>
            <p style={ { margin: '5px' } } data-testid="feedback-total-question">
              { assertions }
            </p>
            <span>{' questões!'}</span>
          </div>
          <div style={ { display: 'flex', alignItems: 'center' } }>
            <span>Um total de</span>
            <p className="score-text" data-testid="feedback-total-score">
              { score }
            </p>
            <span>pontos</span>
          </div>
        </div>
        <div className="feedback-btns">
          <button
          // REQ 15
            className="playagain-btn"
            data-testid="btn-play-again"
            id="play-again"
            onClick={ this.handleFeedbackPageButtons }
            type="button"
          >
            Play Again
          </button>
          <button
            // REQ 16
            className="ranking-btn"
            data-testid="btn-ranking"
            id="ranking"
            onClick={ this.handleFeedbackPageButtons }
            type="button"
          >
            Ver ranking
          </button>
        </div>
        <div className="footer-feedback" />
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
