import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/"> */}
          {/* {logado ? <Redirect to="/search" /> : <Login />} */}
          {/* </Route> */}
          <Route exact path="/" render={ () => (<Login />) } />
          <Route path="/search" render={ () => (<Search />) } />
          <Route path="/album:id" render={ () => (<Album />) } />
          <Route path="/favorites" render={ () => (<Favorites />) } />
          <Route path="/profile/edit" render={ () => (<ProfileEdit />) } />
          <Route exact path="/profile" render={ () => (<Profile />) } />
          <Route exact path="*" render={ () => (<NotFound />) } />
        </Switch>
      </Router>
    );
  }
}

export default App;
