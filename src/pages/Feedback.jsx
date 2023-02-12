import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  handleFeedbackPageButtons = ({ target }) => {
    const { history } = this.props;
    return target.id === 'play-again' ? history.push('/') : history.push('/ranking');
  };

  render() {
    const { gravatarEmail, score, name } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback :D</h1>
        <img src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="gravat" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
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
};

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Feedback);
