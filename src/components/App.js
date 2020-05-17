// dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// stylesheets
import '../stylesheets/App.css';
// components
import WelcomePage from './WelcomePage';
import AddThought from './AddThought';
import SearchMyMind from './SearchMyMind';

function App() {
  const [page, setPage] = React.useState("welcomePage");

  // controller for page rendering
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/addNewThought">
            <AddThought />
          </Route>
          <Route path="/searchMyMind">
            <SearchMyMind />
          </Route>
          <Route path="/">
            <WelcomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
