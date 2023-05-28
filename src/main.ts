import { createApp } from "vue";

import BootstrapVue3 from "bootstrap-vue-3";
import VueGoogleMaps from "@fawmi/vue-google-maps";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import App from "@/App.vue";
import router from "./router/index";

const app = createApp(App);

// Make BootstrapVue available throughout your project
app.use(BootstrapVue3);

// Optionally install the BootstrapVue icon components plugin
// app.use(IconsPlugin);

// app.use(ModalPlugin);
console.log(import.meta.env, import.meta.env.API_KEY);
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.API_KEY,
  },
});
app.use(router);
app.mount("#app");
