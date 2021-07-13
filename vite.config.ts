import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    WindiCSS({
      config: {
        plugins: [require("windicss/plugin/forms")],
        shortcuts: {
          btn: {
            color: "white",
            "@apply": "py-2 px-4 font-semibold rounded-lg",
            "&:hover": {
              "@apply": "bg-green-700",
              color: "black",
            },
          },
          "btn-green": "text-white bg-green-500 hover:bg-green-700",
        },
      },
    }),
  ],
});
