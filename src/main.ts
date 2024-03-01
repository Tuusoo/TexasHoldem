import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
import router from "./router";
import "vant/lib/icon/style/index"
import VConsole from "vconsole";

const vconsole = new VConsole();

createApp(App).use(router).mount("#app");
