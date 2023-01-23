import { defineStore } from "pinia";
import axios from "axios";
import { Login, Register, User } from "@/interfaces/User";

const apiUrl = "https://pokedexbe-akd7k.dev.simco.io/api/";

interface StateTree {
  isRegister: boolean;
  user: User | undefined;
}

const state: () => StateTree = () => ({
  isRegister: false,
  user: undefined,
});

export const useAuthStore = defineStore("AuthStore", {
  state,
  actions: {
    async register(payload: Register) {
      try {
        const res = await axios.post(`${apiUrl}users/register/`, payload);
        if (res.status === 201) {
          this.isRegister = true;
        }
      } catch (err) {
        console.error(err);
      }
    },

    async login(payload: Login) {
      try {
        const res = await axios.post(`${apiUrl}token/`, payload);
        if (res.status === 200) {
          window.localStorage.setItem("access", res.data.access);
          window.localStorage.setItem("refresh", res.data.refresh);
        }
      } catch (err) {
        console.error(err);
      }
    },

    async getUser() {
      try {
        const token = window.localStorage.getItem("access");
        const res = await axios.get(`${apiUrl}users/me/`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (res.status === 200) {
          this.user = res.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
});
