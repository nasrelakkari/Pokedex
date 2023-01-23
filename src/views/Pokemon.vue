<template>
  <base-loader v-if="loading" />
  <div v-if="pokemon && !loading">
    <pokemon-card :pokemon="pokemon" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from "@/components/ui/BaseLoader.vue";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
import { usePokemonStore } from "@/store/pokemon";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const pokemonStore = usePokemonStore();
const route = useRoute();
const { pokemon } = storeToRefs(pokemonStore);

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await pokemonStore.getPokemonById(route.params.id as string);
  loading.value = false;
});
</script>
