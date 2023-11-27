import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7HoZ5R32onVz6BAnNxlcTsbl9hMD9lAo",
  authDomain: "fakebook-84a55.firebaseapp.com",
  projectId: "fakebook-84a55",
  storageBucket: "fakebook-84a55.appspot.com",
  messagingSenderId: "936356579965",
  appId: "1:936356579965:web:9fed7595b59fd3c8567f14",
  measurementId: "G-YJ5T4K9KHN",
};

export const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
export const db = getFirestore(app);
