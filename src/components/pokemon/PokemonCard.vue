<template>
  <div class="pokemon-card mb-8">
    <div class="pokemon-card__content">
      <div class="pokemon-card__content__header">
        <span class="pokemon-card__content__header__nickname">{{
          pokemon.nickname
        }}</span>
        <span class="pokemon-card__content__header__level"
          >Level {{ pokemon.level }}</span
        >
      </div>
      <div class="pokemon-card__content__picture">
        <img :src="pokemon.picture" :alt="`${pokemon.nickname} picture`" />
      </div>
      <div
        v-if="
          pokemon.pokedex_creature.attack && pokemon.pokedex_creature.defense
        "
        class="pokemon-card__content__power"
      >
        <div class="pokemon-card__content__power__content">
          <img :src="require('@/assets/img/icons/icon-attack.png')" />
          <span>{{ pokemon.pokedex_creature.attack }}</span>
        </div>

        <div class="pokemon-card__content__power__content">
          <img :src="require('@/assets/img/icons/icon-defense.png')" />
          <span>{{ pokemon.pokedex_creature.defense }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pokemon } from "@/interfaces/Pokemon";
import { defineProps } from "vue";

const props = defineProps<{
  pokemon: Pokemon;
}>();
</script>

<style lang="scss" scoped>
.pokemon-card {
  border: 10px solid gold;
  border-radius: 20px;
  cursor: pointer;
  width: 80%;
  margin: 0 auto;

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
      width: 70%;
      margin: 20px auto;
      padding: 10px;
    }

    &__power {
      display: flex;
      justify-content: flex-end;
      gap: 20px;

      &__content {
        display: flex;
      }
    }
  }
}
</style>
