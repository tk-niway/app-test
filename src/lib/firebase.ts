import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDGWoxUqm2hJdPWWLiYoTEtrmhpPf2xQ9g",
  authDomain: "typescript-todo-35bd8.firebaseapp.com",
  projectId: "typescript-todo-35bd8",
  storageBucket: "typescript-todo-35bd8.firebasestorage.app",
  messagingSenderId: "808264864327",
  appId: "1:808264864327:web:e2b0790e6eef2c4a429762",
};

// const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);

// Firebase 初期化
const app = initializeApp(firebaseConfig);

// Messaging をクライアントサイドでのみ初期化
export const getClientMessaging = () => {
  if (typeof window !== "undefined") {
    return getMessaging(app);
  }
  return null;
};
