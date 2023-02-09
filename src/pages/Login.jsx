import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveGravatarEmail } from '../redux/actions';

class Login extends Component {
  state = {
    isPlayDisabled: true,
    email: '',
    name: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  };

  handlePlayClick = async () => {
    const apiResult = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => data);
    localStorage.setItem('token', apiResult.token);
    const { email, name } = this.state;
    const gravatarEmail = MD5(email).toString();
    const { dispatch } = this.props;
    dispatch(saveGravatarEmail({ name, gravatarEmail }));
    const { history } = this.props;
    history.push('/game');
  };

  handleConfigClick = () => {
    const { history } = this.props;
    history.push('/configuracoes');
  };

  validation = () => {
    const { email, name } = this.state;
    const emailTest = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
    if (emailTest && name.length > 0) {
      this.setState({ isPlayDisabled: false });
    } else {
      this.setState({ isPlayDisabled: true });
    }
  };

  render() {
    const { isPlayDisabled, email, name } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="input-gravatar-email"
          placeholder="Email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-player-name"
          placeholder="Nome"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          disabled={ isPlayDisabled }
          data-testid="btn-play"
          onClick={ this.handlePlayClick }
        >
          Play

        </button>
        <button data-testid="btn-settings" onClick={ this.handleConfigClick }>
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
