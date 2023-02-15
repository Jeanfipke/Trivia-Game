import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import pointsStar from '../images/points_star.svg';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <div className="main-header">
        <div className="header-user-info">
          <img
            className="user-pic"
            src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
            alt="gravatar foto"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{name}</h3>
        </div>
        <p className="points-div" data-testid="header-score">
          <img className="star" src={ pointsStar } alt="points star" />
          {'Pontos: '}
          {score}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Header);
