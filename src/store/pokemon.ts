import { defineStore } from "pinia";
import axios from "axios";
import { AddPokemon, Pokemon } from "@/interfaces/Pokemon";
import { useToasterStore } from "./toaster";

const apiUrl = "https://pokedexbe-akd7k.dev.simco.io/";

interface StateTree {
  pokemons: Pokemon[];
  pokemon: Pokemon | undefined;
}

const state: () => StateTree = () => ({
  pokemons: [],
  pokemon: undefined,
});

export const usePokemonStore = defineStore("PokemonStore", {
  state,
  actions: {
    async getPokemons() {
      try {
        const token = window.localStorage.getItem("access");
        const res = await axios.get(`${apiUrl}pokemon/`, {
          headers: { Authorization: "Bearer " + token },
        });

        this.pokemons = await Promise.all(
          res.data.results.map(async (pokemon: Pokemon) => {
            const picture = await this.getPokemonPicture(pokemon.nickname);
            return {
              ...pokemon,
              picture,
            };
          })
        );
      } catch (err) {
        console.error(err);
      }
    },

    async getPokemonById(id: string) {
      try {
        const token = window.localStorage.getItem("access");
        const res = await axios.get(`${apiUrl}pokemon/${id}/`, {
          headers: { Authorization: "Bearer " + token },
        });
        const picture = await this.getPokemonPicture(res.data.nickname);
        this.pokemon = { ...res.data, picture };
      } catch (err) {
        console.error(err);
      }
    },

    async addPokemon(payload: AddPokemon) {
      try {
        const toasterStore = useToasterStore();
        const token = window.localStorage.getItem("access");
        const res = await axios.post(
          `${apiUrl}pokemon/`,
          {
            ...payload,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        if (res.status === 201) {
          const picture = await this.getPokemonPicture(res.data.nickname);
          this.pokemons.push({ ...res.data, picture });
          toasterStore.launchToaster("Pokemon is added successfully!");
          console.log(toasterStore.toasterText, toasterStore.toasterError);
        } else {
          toasterStore.launchToaster("This Pokemon does not exist", true);
        }
      } catch (err) {
        console.error(err);
      }
    },

    async deletePokemon(id: number) {
      try {
        const token = window.localStorage.getItem("access");
        const res = await axios.delete(`${apiUrl}pokemon/${id}/`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (res.status === 204) {
          this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
        }
      } catch (err) {
        console.error(err);
      }
    },

    async getPokemonPicture(nickname: string) {
      try {
        const pokedex = await axios.get(`${apiUrl}pokedex/`, {
          params: { name: nickname },
        });
        return pokedex.data.results.length
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedex.data.results[0].ref_number}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
