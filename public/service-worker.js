self.addEventListener("install", (event) => {
  console.log("service Worker  インストール");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker アクティベート");
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification クリック:", event.notification);
  event.notification.close();
});

self.addEventListener("message", (event) => {
  console.log("Service Worker からのメッセージ:", event.data);
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, options } = event.data.payload;
    self.registration.showNotification(title, options);  }
});
