import { createRouter, createWebHistory, type RouterOptions } from "vue-router";
import Start from "@/views/Start/Start.vue";
import Form from "@/views/Start/Form.vue";
import NavbarVue from "@/components/Navbar.vue";
import MainVue from "@/views/GCS/Main.vue";
import MACVue from "@/views/GCS/MAC.vue";
import MEAVue from "@/views/GCS/MEA.vue";
import ERUVue from "@/views/GCS/ERU.vue";

const routes: RouterOptions["routes"] = [
  {
    path: "/",
    name: "Start",
    component: Start,
  },
  {
    path: "/form",
    name: "Form",
    component: Form,
  },
  {
    path: "/gcs",
    name: "GCS",
    component: NavbarVue,
    children: [
      {
        path: "main",
        name: "Main",
        component: MainVue,
      },
      {
        path: "mac",
        name: "MAC",
        component: MACVue,
      },
      {
        path: "eru",
        name: "ERU",
        component: ERUVue,
      },
      {
        path: "mea",
        name: "MEA",
        component: MEAVue,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
