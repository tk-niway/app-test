"use client";
import { useEffect } from "react";

export default function SwIndex() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker 登録完了", registration);
        })
        .catch((error) => {
          console.error("Service Worker 登録失敗", error);
        });
    }
  }, []);

  const notifyUser = async () => {
    if (Notification.permission === "granted") {
      const registration = await navigator.serviceWorker.ready;

      registration.active?.postMessage({
        type: "SHOW_NOTIFICATION",
        payload: {
          title: "処理が完了しました!",
          options: {
            body: "特定の処理が完了しました。詳細をご確認ください",
            icon: "/next.svg",
            badge: "/cat_green.png",
          },
        },
      });
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          notifyUser();
        }
      });
    } else {
      alert("通知がブロックされています。ブラウザ設定を確認してください。");
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={notifyUser}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        通知を送信
      </button>
    </div>
  );
}
