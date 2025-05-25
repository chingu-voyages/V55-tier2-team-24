import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

// export const signInWithGoogle = async () => {
// try{
//     const result = await signInWithPopup(auth, provider);
//       // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     const user = result.user;
//     localStorage.setItem("token", token);
//     console.log("User signed in:", user);
//     return { user, token }
// }catch (error) {
//     console.error("Error signing in with Google:", error.message);
//     throw error;
//   }
// };

// export const logout = async () => {
//   try {
//     await signOut(auth);
//     localStorage.removeItem("token");
//     console.log("User signed out successfully.");
//   } catch (error) {
//     console.error("Error signing out:", error.message);
//     throw error;
//   }
// }
