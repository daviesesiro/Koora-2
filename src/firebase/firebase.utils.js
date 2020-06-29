import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBJYn3vMIwRCUJSfSR1Nq7aWcJdpoYJnQE",
    authDomain: "koora-e1eb5.firebaseapp.com",
    databaseURL: "https://koora-e1eb5.firebaseio.com",
    projectId: "koora-e1eb5",
    storageBucket: "koora-e1eb5.appspot.com",
    messagingSenderId: "133440072249",
    appId: "1:133440072249:web:8cc319c96fe5df33ea3be8",
    measurementId: "G-BKTD60QWVQ"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    });
}
