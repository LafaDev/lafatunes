import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      submitDisable: true,
      loading: false,
      logado: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  handleSubmit() {
    const { loginName } = this.state;
    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: loginName });
        this.setState({ loading: false, logado: true });
      },
    );
  }

  handleValue({ target }) {
    const magicMx = 3;
    const { name, value } = target;
    this.setState({ [name]: value });
    if (name === 'loginName' && value.length >= magicMx) {
      this.setState({ submitDisable: false });
    } else { this.setState({ submitDisable: true }); }
  }

  render() {
    const { loginName, submitDisable, loading, logado } = this.state;
    return (
      <div data-testid="page-login">
        {logado ? (<Redirect to="/search" />) : null}
        <h1>Login</h1>
        <form>
          <label htmlFor="login-name">
            <input
              id="login-name"
              name="loginName"
              type="text"
              value={ loginName }
              data-testid="login-name-input"
              onChange={ this.handleValue }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ submitDisable }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
        {loading ? (<p>Carregando...</p>) : null}
      </div>
    );
  }
}

export default Login;
