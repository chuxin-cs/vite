import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {
    createVitePluginDeleteConsole, createVitePluginQrcode,
} from "./src/plugins";

export default defineConfig({
    plugins: [vue(), // createVitePluginDeleteConsole(),
        createVitePluginQrcode()],
});
