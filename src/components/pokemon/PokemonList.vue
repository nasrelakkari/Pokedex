<template>
  <base-loader v-if="loading" />
  <div v-else class="pokemon-list">
    <pokemon-card
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @click="goToPage(RoutesEnum.POKEMONS, { id: pokemon.id })"
    />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from "@/components/ui/BaseLoader.vue";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
import { useNavigation } from "@/composables/navigation";
import { RoutesEnum } from "@/interfaces/Router";
import { usePokemonStore } from "@/store/pokemon";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const { goToPage } = useNavigation();
const pokemonStore = usePokemonStore();
const { pokemons } = storeToRefs(pokemonStore);

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await pokemonStore.getPokemons();
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.pokemon-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  width: 80%;
  margin: 50px auto;
}
.pokemon-card {
  border: 10px solid gold;
  border-radius: 20px;
  cursor: pointer;

  &__content {
    border: 3px solid black;
    padding: 20px;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__nickname {
        font-size: 18px;
        font-weight: 800;
        text-transform: uppercase;
      }

      &__level {
        font-weight: 800;
      }
    }

    &__picture {
      display: flex;
      justify-content: center;
      border: 2px solid grey;
      border-radius: 10px;
      width: 50%;
      margin: 20px auto;
      padding: 10px;
    }
  }
}
</style>
