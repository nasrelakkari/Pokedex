import { defineStore } from "pinia";

const axios = require("axios");

const instance = axios.create({
  baseURL: "https://pokedexbe-akd7k.dev.simco.io/api/",
});

interface StateTree {
  user: string | undefined;
}

const state: () => StateTree = () => ({
  user: undefined,
});

export const useAuthStore = defineStore("AuthStore", {
  state,
  actions: {},
});
