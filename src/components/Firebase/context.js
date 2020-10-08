/*
** Using React Context API to provide a Firebase instance once
** at the top level of the component hierarchy
*/

import React from 'react';

const FirebaseContext = React.createContext(null);

// higher order component
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        { firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;