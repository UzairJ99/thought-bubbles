import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// Firebase
import Firebase, {FirebaseContext} from './components/Firebase';

ReactDOM.render(
  // React Context API to place Firebase Context Provider at the top level of the component hierarchy
  <FirebaseContext.Provider value={new Firebase()}>
    {/* everything in here has access to firebase */}
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);