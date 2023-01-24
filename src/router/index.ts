import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Pokemon from "@/views/Pokemon.vue";
import { RoutesEnum } from "@/interfaces/Router";
import { useAuthStore } from "@/store/auth";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
  {
    path: `/${RoutesEnum.POKEMONS}/:id`,
    name: RoutesEnum.POKEMONS,
    component: Pokemon,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next): Promise<void> => {
  const authStore = useAuthStore();
  await authStore.getUser();
  if (
    (to.name === RoutesEnum.LOGIN || to.name === RoutesEnum.REGISTER) &&
    authStore.user
  ) {
    next({
      name: RoutesEnum.HOME,
    });
  } else if (
    (to.name === RoutesEnum.HOME || to.name === RoutesEnum.POKEMONS) &&
    !authStore.user
  ) {
    next({
      name: RoutesEnum.LOGIN,
    });
  } else {
    next();
  }
});
export default router;
