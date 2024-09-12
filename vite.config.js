import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/boardmeeting/",
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update the service worker
      includeAssets: [
        "favicon.svg", // Adding the favicon
        "src/assets/img/*", // Include all images in the img folder
        "robots.txt", // Example of other assets you may want to include
        "apple-touch-icon.png"
      ],
      manifest: {
        name: 'BoardMeeting App',
        short_name: 'BoardMeeting',
        description: 'A Board Meeting Progressive Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // Ensures app looks like a native app
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/manifest-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/manifest-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
    }),
  ],
  server: {
    proxy: {
      "/BoardMeetingApi": {
        target: "https://myzonebeta.motilaloswal.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/BoardMeetingApi/, "/BoardMeetingApi"),
      },
    },
  },
});
