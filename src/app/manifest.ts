import type { MetadataRoute } from "next";

interface ExtendedManifest extends MetadataRoute.Manifest {
  gcm_sender_id?: string; // gcm_sender_id を追加
}

export default function manifest(): ExtendedManifest {
  return {
    name: "Next.js PWA",
    short_name: "NextPWA",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/cat_green.png", // 修正: `/public` を省略
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/cat_green.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    gcm_sender_id: "103953800507",
  };
}
