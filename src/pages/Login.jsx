import React, { Component } from 'react';

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
        <button disabled={ isPlayDisabled } data-testid="btn-play">Play</button>
      </div>
    );
  }
}

export default Login;
