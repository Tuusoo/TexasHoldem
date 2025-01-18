import "vant/lib/index.css";
// import VConsole from "vconsole";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.less";
import { createPinia } from "pinia";

const pinia = createPinia();

// const vconsole = new VConsole();

createApp(App).use(router).use(pinia).mount("#app");
