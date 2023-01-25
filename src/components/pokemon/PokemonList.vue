<template>
  <div class="pokemon-list">
    <pokemon-card
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :deleteButton="true"
      @click="goToPage(RoutesEnum.POKEMONS, { id: pokemon.id })"
    />
  </div>
</template>

<script setup lang="ts">
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
import { useNavigation } from "@/composables/navigation";
import { RoutesEnum } from "@/interfaces/Router";
import { usePokemonStore } from "@/store/pokemon";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const { goToPage } = useNavigation();
const pokemonStore = usePokemonStore();
const { pokemons } = storeToRefs(pokemonStore);
</script>

<style lang="scss" scoped>
.pokemon-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  width: 80%;
  margin: 50px auto;
}
</style>
