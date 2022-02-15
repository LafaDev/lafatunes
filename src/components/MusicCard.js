import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      isThere: false,
      loading: false,
      screenView: true,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    favorites.forEach((song) => {
      if (song.trackId === trackId) {
        this.setState(
          { isThere: true },
          async () => {
            this.setState({ isFavorite: true });
          },
        );
      }
    });
  }

  handleFavorite() {
    const { page, ...music } = this.props;
    const { isFavorite, isThere } = this.state;
    // if false to true
    if (!isFavorite && !isThere) {
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
          if (page === 'favorites') this.setState({ screenView: false });
          await removeSong(music);
          await this.setState({ isFavorite: false, isThere: false, loading: false });
        },
      );
    }
  }

  render() {
    const { artworkUrl60, previewUrl, trackName, trackId } = this.props;
    const { isFavorite, loading, screenView } = this.state;
    return (
      <div>
        { screenView ? (
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
        ) : (<h1 className="loadingDel">Carregando...</h1>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  artworkUrl60: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default MusicCard;
