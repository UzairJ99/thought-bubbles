import app from 'firebase/app';
import 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
    }

    /*****authentication API from Firebase*****/

    // create user
    doCreateUser = (email, password) => {
        var authUser = this.auth.createUserWithEmailAndPassword(email, password);
        return authUser;
    }

    // sign in user
    doSignIn = (email, password) => {
        var authUser = this.auth.signInWithEmailAndPassword(email, password);
        return authUser;
    }

    // log off
    doSignOut = () => {
        var authUser = this.auth.signOut();
        return authUser;
    }

    // upload a submission to the database
    doUpload = (submission) => {
        db.collection(authUser).add(submission)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

}

export default Firebase;