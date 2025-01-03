importScripts(
  "https://www.gstatic.com/firebasejs/9.20.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDGWoxUqm2hJdPWWLiYoTEtrmhpPf2xQ9g",
  authDomain: "typescript-todo-35bd8.firebaseapp.com",
  projectId: "typescript-todo-35bd8",
  storageBucket: "typescript-todo-35bd8.firebasestorage.app",
  messagingSenderId: "808264864327",
  appId: "1:808264864327:web:e2b0790e6eef2c4a429762",
};

// Firebase 初期化
firebase.initializeApp(firebaseConfig);

// Messaging インスタンスを取得
const messaging = firebase.messaging();

// バックグラウンド通知を受信
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );

  // 通知の内容を取得
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/firebase-logo.png", // 任意のアイコン
  };

  // 通知を表示
  self.registration.showNotification(notificationTitle, notificationOptions);
});
