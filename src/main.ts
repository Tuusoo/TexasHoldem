import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
import router from "./router";
import "vant/lib/icon/style/index"

createApp(App).use(router).mount("#app");
