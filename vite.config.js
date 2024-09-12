// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

let faviconURL = "/vite.svg";

export default defineConfig({
  base: "/boardmeeting",
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        faviconURL,
        "src/assets/img/*", // Include all images in the img folder
      ],
      manifest: {
        theme_color: "#ffffff",
        icons: [
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/png",
          },
        ],
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
