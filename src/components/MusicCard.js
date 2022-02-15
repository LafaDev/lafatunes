import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      loading: false,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    favorites.forEach((song) => {
      if (song.trackId === trackId) {
        this.setState({ isFavorite: true });
      }
    });
  }

  handleFavorite() {
    const { ...music } = this.props;
    const { isFavorite } = this.state;
    // if false to true
    if (!isFavorite) {
      this.setState(
        { loading: true },
        async () => {
          await addSong(music);
          await this.setState({ isFavorite: true, loading: false });
        },
      );
    } else if (isFavorite) {
      this.setState(
        { loading: true },
        async () => {
          await removeSong(music);
          await this.setState({ isFavorite: false, loading: false });
        },
      );
    }
  }

  render() {
    const { artworkUrl60, previewUrl, trackName, trackId } = this.props;
    const { isFavorite, loading } = this.state;
    return (
      <div className="musicCard">
        <h3>{ trackName }</h3>
        <img src={ artworkUrl60 } alt={ trackName } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <br />
        <label className="musicSub" htmlFor={ `track-${trackId}` }>
          Favorita
          <input
            id={ `track-${trackId}` }
            type="checkbox"
            checked={ isFavorite }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavorite }
          />
        </label>
        { loading ? <p className="loadingMusic">Carregando...</p> : null }
      </div>
    );
  }
}

MusicCard.propTypes = {
  artworkUrl60: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
