import firebase from 'firebase'
import 'firebase/auth' 

const firebaseConfig = {
    apiKey: "AIzaSyCJfO3osbdW4qLJG_LGjssW66TdCersVVU",
    authDomain: "finanservs-dev.firebaseapp.com",
    projectId: "finanservs-dev",
    storageBucket: "finanservs-dev.appspot.com",
    messagingSenderId: "537247854338",
    appId: "1:537247854338:web:29dd58c8775d8e91251c1b",
    measurementId: "G-N3S535FQXP"  
};

const fire = firebase.initializeApp(firebaseConfig)
const auth = fire.auth()

export {auth}