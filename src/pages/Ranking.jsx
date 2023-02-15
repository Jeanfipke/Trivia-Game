import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';
import './Ranking.css';
import triviaLogo from '../images/logo trivia.svg';
import star from '../images/points_star.svg';

class Ranking extends Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingList = ranking.map((item, index) => (
      <li className="player-score-div" key={ index }>
        <div className="player-info">
          <img className="ranking-pic" src={ item.picture } alt={ item.name } />
          <p data-testid={ `player-name-${index}` }>{item.name}</p>
        </div>
        <div className="ranking-points">
          <img className="star" src={ star } alt="star" />
          <p data-testid={ `player-score-${index}` }>{item.score}</p>
          <span className="points-text">pontos</span>
        </div>
      </li>
    ));

    return (
      <div className="ranking-main">
        <div className="ranking-div">
          <img className="trivia-logo-ranking" src={ triviaLogo } alt="trivia logo" />
          <h1 className="title" data-testid="ranking-title">RANKING</h1>
          <div>
            {/* REQ 19 */}
            <ul className="ranking">
              { rankingList }
            </ul>
          </div>
          <button
          // REQ 18
            className="playagain-ranking"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
            type="button"
          >
            JOGAR NOVAMENTE
          </button>
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
