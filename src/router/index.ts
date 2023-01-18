import { RoutesEnum } from "@/interfaces/Router";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: RoutesEnum.HOME,
    component: Home,
  },
  {
    path: `/${RoutesEnum.REGISTER}`,
    name: RoutesEnum.REGISTER,
    component: Register,
  },
  {
    path: `/${RoutesEnum.LOGIN}`,
    name: RoutesEnum.LOGIN,
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
