// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///C:/Users/NBA%20Graphic%201/Documents/GitHub/frontend-Maruey/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/NBA%20Graphic%201/Documents/GitHub/frontend-Maruey/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/NBA%20Graphic%201/Documents/GitHub/frontend-Maruey/vite.config.js";
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    define: {
      "process.env": env
    },
    plugins: [vue()],
    server: {
      host: true,
      port: 3e3
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxOQkEgR3JhcGhpYyAxXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZnJvbnRlbmQtTWFydWV5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxOQkEgR3JhcGhpYyAxXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZnJvbnRlbmQtTWFydWV5XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9OQkElMjBHcmFwaGljJTIwMS9Eb2N1bWVudHMvR2l0SHViL2Zyb250ZW5kLU1hcnVleS92aXRlLmNvbmZpZy5qc1wiOy8vIGltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5cclxuLy8gaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuLy8gaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcblxyXG4vLyAvLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG4vLyBleHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4vLyAgIHBsdWdpbnM6IFtcclxuLy8gICAgIHZ1ZSgpLFxyXG4vLyAgIF0sXHJcbi8vICAgcmVzb2x2ZToge1xyXG4vLyAgICAgYWxpYXM6IHtcclxuLy8gICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vIH0pXHJcblxyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tIFwibm9kZTp1cmxcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcclxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcclxuICAgIGRlZmluZToge1xyXG4gICAgICBcInByb2Nlc3MuZW52XCI6IGVudixcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbdnVlKCldLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07Il0sCiAgIm1hcHBpbmdzIjogIjtBQWlCQSxTQUFTLGVBQWUsV0FBVztBQUNuQyxTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFNBQVM7QUFuQmlOLElBQU0sMkNBQTJDO0FBdUJsUixJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDM0IsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFNBQU8sYUFBYTtBQUFBLElBQ2xCLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxJQUNqQjtBQUFBLElBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLElBQ2YsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
