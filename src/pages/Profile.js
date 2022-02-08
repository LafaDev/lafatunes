import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header page="profile" />
        <h1 className="pageTitle">Profile</h1>
      </div>
    );
  }
}

export default Profile;
