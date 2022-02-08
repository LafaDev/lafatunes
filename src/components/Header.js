import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
      currPage: '',
    };

    this.getData = this.getData.bind(this);
    this.activeTab = this.activeTab.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.activeTab();
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

  activeTab() {
    const { page } = this.props;
    this.setState({ currPage: page });
  }

  render() {
    const { user, loading, currPage } = this.state;
    return (
      <header
        data-testid="header-component"
        className="headerBox"
      >
        {loading ? (<h2>Carregando...</h2>) : (
          <h2 data-testid="header-user-name">
            Bem vindo,&nbsp;
            {' '}
            {user.name}
            !
          </h2>
        ) }
        <nav>
          <ul>
            <li>
              <Link
                className={ (currPage === 'search') ? 'selected' : 'headerLink' }
                to="/search"
                data-testid="link-to-search"
              >
                Procurar
              </Link>
            </li>
            <li>
              <Link
                className={ (currPage === 'favorites') ? 'selected' : 'headerLink' }
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritos
              </Link>
            </li>
            <li>
              <Link
                className={ (currPage === 'profile') ? 'selected' : 'headerLink' }
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Header;
