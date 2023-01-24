import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./interceptors/axios";

loadFonts();

const pinia = createPinia();

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
