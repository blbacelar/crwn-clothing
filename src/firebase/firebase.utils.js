import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAV3aXkRWKnOk8yZV__6Cy61h64i1MRf5E",
    authDomain: "crwn-db-1766e.firebaseapp.com",
    databaseURL: "https://crwn-db-1766e.firebaseio.com",
    projectId: "crwn-db-1766e",
    storageBucket: "crwn-db-1766e.appspot.com",
    messagingSenderId: "902642844593",
    appId: "1:902642844593:web:9fa0d8de1c42723d787390",
    measurementId: "G-XKL0BM7TVZ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt, ...additionalData
            })
        }   catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoole = () => auth.signInWithPopup(provider)

export default firebase;