import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    // this.setState({ user: response });
    this.setState(
      { loading: true },
      async () => {
        const response = await getUser();
        this.setState({
          name: response.name,
          email: response.email,
          image: response.image,
          description: response.description,
          loading: false,
        });
      },
    );
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header page="profile" />
        <h1 className="pageTitle">Profile</h1>
        {loading ? (<h1>Carregando...</h1>) : (
          <div>
            <img
              src={ image }
              alt="user"
              data-testid="profile-image"
            />
            <p>{name}</p>
            <p>{email}</p>
            <p>{description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
