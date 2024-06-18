const { getAuth } = require("firebase/auth");
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyAABpzdZ9YePw5oB0nIgI2AAiUpleCrvDs",
  authDomain: "bike-ddaf0.firebaseapp.com",
  projectId: "bike-ddaf0",
  storageBucket: "bike-ddaf0.appspot.com",
  messagingSenderId: "900905235750",
  appId: "1:900905235750:web:b11680fd62cd4df4e6fde7",
  measurementId: "G-0BNJX4X3N4",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
