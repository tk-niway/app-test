"use client";
import { useEffect, useState } from "react";
import { getClientMessaging } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";

export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const messaging = getClientMessaging();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          console.log("Service Worker already registered:", registration);
        })
        .catch(() => {
          // 未登録の場合にのみ登録を実行
          navigator.serviceWorker
            .register("/firebase-messaging-sw.js")
            .then((registration) => {
              console.log(
                "Service Worker registered successfully:",
                registration
              );
            })
            .catch((error) => {
              console.error("Service Worker registration failed:", error);
            });
        });
    }

    if (messaging) {
      getToken(messaging, {
        vapidKey:
          "BDYVUJ4kEZ5OK-Zoiuup72w8Qe09i3TC2tKsioBZhCGhQCfHmcz7-m02gqweSihjnbdP-AClf6zEsHLqvh_CZcA",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Token obtained:", currentToken);
            setToken(currentToken);
          } else {
            console.warn(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((error) => {
          console.error("An error occurred while retrieving token. ", error);
        });

      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        displayNotification(
          payload?.notification?.title,
          payload?.notification?.body
        );
      });
    }
  }, []);

  const displayNotification = (
    title: string | undefined,
    body: string | undefined
  ) => {
    if (Notification.permission === "granted") {
      new Notification(title || "Notification", {
        body: body || "You have a new message!",
        icon: "/next.svg",
      });
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title || "Notification", {
            body: body || "You have a new message!",
            icon: "/next.svg",
          });
        }
      });
    } else {
      console.warn("Notification permission denied.");
    }
  };

  return (
    <>
      {children}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
        }}
      >
        <h3>FCM Token</h3>
        <textarea
          readOnly
          value={token}
          rows={5}
          style={{
            width: "100%",
            resize: "none",
            backgroundColor: "#000", // 背景を黒に設定
            color: "#fff", // 文字色を白に設定
            border: "1px solid #ccc", // 境界線
            padding: "10px", // 余白
            borderRadius: "5px", // 角丸
          }}
        />
        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigator.clipboard.writeText(token);
            alert("Token copied to clipboard!");
          }}
        >
          Copy Token
        </button>
      </div>
    </>
  );
}
