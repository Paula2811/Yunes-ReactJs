import firebase from "firebase"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDjUGqD2gytfB6lSqLW4BFJylYYPwhVYXQ",
    authDomain: "yunes-reactjs.firebaseapp.com",
    projectId: "yunes-reactjs",
    storageBucket: "yunes-reactjs.appspot.com",
    messagingSenderId: "892917913796",
    appId: "1:892917913796:web:18952bfdbbdca66cb7d191"
};

const app = firebase.initializeApp(firebaseConfig)

export function getFirestore(){
    return firebase.firestore(app)
}
