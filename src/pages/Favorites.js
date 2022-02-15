import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
    };
    this.handleGetFavorites = this.handleGetFavorites.bind(this);
  }

  componentDidMount() {
    this.handleGetFavorites();
  }

  componentDidUpdate() {
    this.handleGetFavorites();
  }

  async handleGetFavorites() {
    const result = await getFavoriteSongs();
    // sort by artist name
    const one = 1;
    result.sort((a, b) => (a.artistName > b.artistName ? one : !one));
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    this.setState({ favoriteSongs: result });
  }

  render() {
    const { favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header page="favorites" />
        <h1 className="pageTitle">Suas musicas favoritas!</h1>
        <ul className="musicList">
          {favoriteSongs.map((song) => (
            <li key={ song.trackId }>
              <MusicCard { ...song } page="favorites" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Favorites;
