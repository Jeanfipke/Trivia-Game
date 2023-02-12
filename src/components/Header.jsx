import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = this.props;

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="gravatar foto"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
});

export default connect(mapStateToProps)(Header);
