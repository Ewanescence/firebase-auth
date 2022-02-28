import { initializeApp } from "firebase/app";

// Firebase required imports
import { getAuth } from 'firebase/auth'

// Firebase optional imports
import { getAnalytics } from 'firebase/analytics'

// Your firebase config (copy-paste it from your firebase project)
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Firebase app initialization
const app = initializeApp(firebaseConfig)

// Firebase required exports
export const auth = getAuth(app)

// Firebase optional imports
export const analytics = getAnalytics(app)


