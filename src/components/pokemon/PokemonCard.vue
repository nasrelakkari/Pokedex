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
        v-if="deleteButton"
        class="pokemon-card__content__delete-btn"
        @click.stop="deletePokemon(pokemon.id)"
      >
        <base-button>Delete</base-button>
      </div>
      <div
        v-if="
          pokemonDetail.pokedex_creature.attack &&
          pokemonDetail.pokedex_creature.defense
        "
        class="pokemon-card__content__power"
      >
        <div class="pokemon-card__content__power__content">
          <img :src="require('@/assets/img/icons/icon-attack.png')" />
          <span>{{ pokemonDetail.pokedex_creature.attack }}</span>
        </div>

        <div class="pokemon-card__content__power__content">
          <img :src="require('@/assets/img/icons/icon-defense.png')" />
          <span>{{ pokemonDetail.pokedex_creature.defense }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import { PokedexCreature, PokemonDetail, Pokemon } from "@/interfaces/Pokemon";
import { usePokemonStore } from "@/store/pokemon";
import { defineProps, computed } from "vue";

interface Props {
  pokemon: Pokemon | PokemonDetail;
  deleteButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  deleteButton: false,
});

const pokemonStore = usePokemonStore();

const pokemonDetail = computed(() => {
  return props.pokemon as PokemonDetail;
});

const deletePokemon = async (id: number) => {
  await pokemonStore.deletePokemon(id);
};
</script>

<style lang="scss" scoped>
.pokemon-card {
  border: 10px solid gold;
  border-radius: 20px;
  cursor: pointer;
  width: 80%;
  margin: 0 auto;
  box-sizing: content-box;

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
        gap: 10px;
      }
    }

    &__delete-btn {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
