import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      artistName: '',
      disableSearch: true,
      loading: false,
      notFound: false,
      searchResult: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    if (name === 'searchInput' && value.length >= 2) {
      this.setState({ disableSearch: false });
    } else { this.setState({ disableSearch: true }); }
  }

  async handleSearch(e) {
    e.preventDefault();
    const { searchInput } = this.state;
    await this.returnSearch(searchInput);
    this.setState({ searchInput: '', artistName: searchInput });
  }

  async returnSearch(pam) {
    this.setState(
      { loading: true },
      async () => {
        const result = await searchAlbumsAPI(pam);
        this.setState({ loading: false, notFound: !result.length, searchResult: result });
      },
    );
    // this.setState({ searchResult: result });
  }

  render() {
    const {
      searchInput,
      artistName,
      loading,
      notFound,
      disableSearch,
      searchResult } = this.state;
    return (
      <div data-testid="page-search">
        <Header page="search" />
        <h1 className="pageTitle">Procure seu artista preferido!</h1>
        <form onSubmit={ this.handleSearch }>
          <label htmlFor="searchInput">
            <input
              id="searchInput"
              className="searchInput"
              name="searchInput"
              value={ searchInput }
              onChange={ this.handleChange }
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disableSearch }
            onClick={ this.handleSearch }
            id="searchButton"
            className="searchButton"
          >
            Pesquisar
          </button>
        </form>
        { loading ? <h1>Carregando...</h1> : null}
        { notFound ? <h1>Nenhum álbum foi encontrado</h1> : null}
        { artistName.length && !notFound ? (
          <h1>
            Resultado de álbuns de:
            {' '}
            {artistName}
          </h1>
        ) : null}
        <section className="resultContainer">
          {searchResult.map((collection) => (
            <Link
              to={ `/album/${collection.collectionId}` }
              data-testid={ `link-to-album-${collection.collectionId}` }
              key={ collection.collectionId }
              className="resultCards"
            >
              <img
                src={ collection.artworkUrl100 }
                alt={ collection.collectionName }
                width="200"
                height="200"
              />
              <h1>{collection.collectionName}</h1>
              {/* <h3>{collection.artistName}</h3> */}
            </Link>
            // <div key={ collection.collectionId }>
            // </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Search;
