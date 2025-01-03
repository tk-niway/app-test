"use client";
import { useEffect, useState } from "react";
import { getClientMessaging } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";

export default function FbIndex() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const messaging = getClientMessaging();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service worker registered:", registration);
        })
        .catch((error) =>
          console.error("Service Worker registration failed:", error)
        );
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
        // alert(`Foreground Notification: ${payload?.notification?.title}`); // ブラウザ通知
        displayNotification(
          payload?.notification?.title,
          payload?.notification?.body
        ); //OS通知
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
    } else if (Notification.permission !== "default") {
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
    <div>
      <h1>Firebase Cloud Messaging Example</h1>
      <p>Your Token:</p>
      <textarea readOnly value={token} rows={5} cols={40} />
    </div>
  );
}
