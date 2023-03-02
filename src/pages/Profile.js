import React from 'react';
// import { Link } from 'react-router-dom';
import profile from '../images/profile.png';
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
        let { image } = response;
        if (!image || image === '') {
          image = profile;
        }
        this.setState({
          name: response.name,
          email: response.email,
          image,
          description: response.description,
          loading: false,
        });
      },
    );
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <div data-testid="page-profile" className="profile-container">
        <Header page="profile" />
        <h1 className="pageTitle" id="profiletitle">Profile</h1>
        {loading ? (<h1>Carregando...</h1>) : (
          <div>
            <img
              src={ image }
              alt="user"
              data-testid="profile-image"
              id="profile-image"
            />
            <p id="profile-name">{name}</p>
            <p id="profile-email">{email}</p>
            <p>{description}</p>
            {/* <Link id="editperfil" to="/profile/edit">Editar perfil</Link> */}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
