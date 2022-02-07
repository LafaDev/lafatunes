import React from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Search</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
