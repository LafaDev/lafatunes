import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import loadingGif from '../images/headphone.gif';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      loading: false,
      musics: [],
      artistName: '',
      collectionName: '',
    };
    this.returnSearch = this.returnSearch.bind(this);
  }

  componentDidMount() {
    this.returnSearch();
  }

  returnSearch() {
    const { match: { params: { id } } } = this.props;
    this.setState(
      { loading: true },
      async () => {
        const result = await getMusics(id);
        if (result) {
          this.setState(
            {
              loading: false,
              musics: [...result],
              artistName: result.find((e) => e).artistName,
              collectionName: result.find((e) => e).collectionName,
            },
          );
        } else {
          this.setState({ error: true });
        }
      },
    );
  }

  render() {
    const { loading, artistName, collectionName, musics, error } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <h1>Carregando...</h1> : null}
        <h1 data-testid="artist-name">{ artistName }</h1>
        { error ? (
          <div>
            <img
              src={ loadingGif }
              alt="Headphones animation of loading"
              className="errorgif"
              width="180"
              height="180"
            />
            <h1>Não foi possivel encontrar esse album</h1>
          </div>
        ) : null}
        <h1 data-testid="album-name">{ collectionName }</h1>
        <ul className="musicList">
          {musics.slice(1).map(((e) => (
            <li key={ e.trackId }>
              <MusicCard { ...e } page="album" />
            </li>
          )))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
