// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB4vNfjdbP5ED56E7zMtiPUU0vf-Bxl4XM",
  authDomain: "pensphere-208a7.firebaseapp.com",
  projectId: "pensphere-208a7",
  storageBucket: "pensphere-208a7.appspot.com",
  messagingSenderId: "3323464249",
  appId: "1:3323464249:web:a13d3e60ee38131e539be8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { fireDB, auth, storage };
