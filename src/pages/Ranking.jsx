import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const rankingList = listItens.map(() => (
      <li key="ranking-list-item">
        <img src="" alt="" />
        <h5 data-testid={ `player-name-${index}` }>Nome</h5>
        <p data-testid={ `player-score-${index}` }>Pontuação</p>
      </li>
    ));

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          // REQ 18
          data-testid="btn-go-home"
          onClick={ this.handleClick }
          type="button"
        >
          Ir ao início
        </button>
        <div>
          {/* REQ 19 */}
          <ul>
            { rankingList }
          </ul>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
