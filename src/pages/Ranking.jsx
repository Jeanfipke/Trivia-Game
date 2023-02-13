import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingList = ranking.map((item, index) => (
      <li key={ index }>
        <img src={ item.picture } alt={ item.name } />
        <h5 data-testid={ `player-name-${index}` }>{item.name}</h5>
        <p data-testid={ `player-score-${index}` }>{item.score}</p>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
