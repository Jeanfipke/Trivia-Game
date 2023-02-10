import React, { Component } from 'react';

class Feedback extends Component {
    handleFeedbackPageButtons = ({ target }) => {
      const { history } = this.props;
      return target.id === 'play-again' ? history.push('/') : history.push('/ranking');
    };

  render() {
    return (
      <div> 
        <button
          //REQ 15
          data-testid="btn-play-again"
          id="play-again"
          onClick={ this.handleFeedbackPageButtons }
          type="button"
        >
          Play Again
        </button>
        <button
         //REQ 16
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

export default Feedback;
