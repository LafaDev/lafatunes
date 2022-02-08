import PropTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      loading: false,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleFavorite({ target }) {
    const { ...music } = this.props;
    const { checked } = target;
    const { isFavorite } = this.state;

    console.log(isFavorite);
    console.log(checked);
    if (isFavorite === false) {
      this.setState(
        { loading: true },
        async () => {
          await addSong(music);
          this.setState({ isFavorite: true, loading: false });
        },
      );
    } else {
      this.setState(
        { loading: true },
        async () => {
          this.setState({ isFavorite: false, loading: false });
        },
      );
    }
    console.log(isFavorite);
  }

  render() {
    const { artworkUrl30, previewUrl, trackName, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        <h3>{ trackName }</h3>
        <img src={ artworkUrl30 } alt={ trackName } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `track-${trackId}` }>
          Favorita
          <input
            id={ `track-${trackId}` }
            type="checkbox"
            checked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavorite }
          />
          { loading ? <p>Carregando...</p> : null }
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artworkUrl30: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
