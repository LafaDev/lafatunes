import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header page="favorites" />
        <h1 className="pageTitle">Favorites</h1>
      </div>
    );
  }
}

export default Favorites;
