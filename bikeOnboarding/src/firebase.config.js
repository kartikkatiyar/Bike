// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeyKoutlF5u3YDxp2JmxGa4ThM-FGqzog",
  authDomain: "bikeonboarding.firebaseapp.com",
  projectId: "bikeonboarding",
  storageBucket: "bikeonboarding.appspot.com",
  messagingSenderId: "853254208096",
  appId: "1:853254208096:web:e18d5882c971cdb0a56105",
  measurementId: "G-0N1JRF1ZNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
auth.settings.appVerificationDisabledForTesting = true;

export { auth, RecaptchaVerifier, signInWithPhoneNumber };