// dependencies
import React from 'react';
import {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// components
import WelcomePage from './WelcomePage';
import {AddThought} from './SubmitThought';
import SearchMyMind from './SearchMyMind';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
// stylesheets
import '../stylesheets/App.css';
// constants
import * as ROUTES from '../constants/routes';
import { withFirebase } from './Firebase/index';

const App = (props) => {
  // session handling
  const [authUser, setAuthUser] = React.useState(null);

  // check for change in global state
  useEffect(() => {
    props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? setAuthUser({ authUser })
        : setAuthUser({ authUser: null });
    });
  });

  // controller for page rendering
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.WELCOME}>
            {
              // renders the page whether the user has logged in or not - otherwise redirect to login page
              (authUser != null) ? <WelcomePage authUser={authUser} /> : <Redirect to={ROUTES.SIGNIN} /> 
            }
          </Route>
          <Route path={ROUTES.ADD}>
            <AddThought authUser={authUser}/>
          </Route>
          <Route path={ROUTES.SEARCH}>
            <SearchMyMind authUser={authUser}/>
          </Route>
          <Route path={ROUTES.SIGNIN}>
            <LoginPage/>
          </Route>
          <Route path={ROUTES.SIGNUP}>
            <RegisterPage/>
          </Route>
          <Route path={ROUTES.LANDING}>
            <LandingPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default withFirebase(App);