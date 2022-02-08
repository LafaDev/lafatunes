import React from 'react';
import { Redirect } from 'react-router-dom';
import loadingGif from '../images/headphone.gif';
import { createUser } from '../services/userAPI';
import '../App.css';

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
      <div data-testid="page-login" className="login">
        {logado ? (<Redirect to="/search" />) : null}
        {loading ? (
          <div className="loadingContainer disable-select">
            <img
              src={ loadingGif }
              alt="Headphones animation of loading"
              className="loginImg"
              width="180"
              height="180"
            />
            <h1>Carregando...</h1>
          </div>
        ) : (
          <form className="loginBox disable-select" autoComplete="off">
            <img
              className="loginImg"
              src="https://media4.giphy.com/media/yZ9unuhuUemYvoeQaR/giphy.gif"
              alt="Headphones"
              width="240"
              height="240"
            />
            <h1>TrybeTunes</h1>
            <label htmlFor="login-name" className="loginLabel">
              Login
              <input
                className="loginField"
                id="login-name"
                placeholder="Nome"
                spellCheck="false"
                name="loginName"
                type="text"
                value={ loginName }
                data-testid="login-name-input"
                onChange={ this.handleValue }
              />
            </label>
            <button
              className="loginButton"
              type="button"
              data-testid="login-submit-button"
              disabled={ submitDisable }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
