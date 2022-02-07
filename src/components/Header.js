import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    // this.setState({ user: response });
    this.setState(
      { loading: true },
      async () => {
        const response = await getUser();
        this.setState({ user: response, loading: false });
      },
    );
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        {loading ? (<p>Carregando...</p>) : null}
        <h2 data-testid="header-user-name">{user.name}</h2>
      </header>
    );
  }
}

export default Header;
