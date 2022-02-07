import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      disableSearch: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    if (name === 'searchInput' && value.length >= 2) {
      this.setState({ disableSearch: false });
    } else { this.setState({ disableSearch: true }); }
  }

  render() {
    const { searchInput, disableSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <label htmlFor="searchInput">
            <input
              id="searchInput"
              name="searchInput"
              value={ searchInput }
              onChange={ this.handleChange }
              type="text"
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disableSearch }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
