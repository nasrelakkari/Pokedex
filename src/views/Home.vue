<template>
  <div class="home-view">
    <base-loader v-if="loading" />
    <div v-else>
      <div class="home-view__content__button">
        <base-button @click="openModal = true">Add Pokemon</base-button>
      </div>
      <pokemon-list />
      <base-modal v-model="openModal" :title="'Add a Pokemon'">
        <base-form
          :initialValues="initialValues"
          :textBtn="'Add Pokemon'"
          hasMandatoryField
          @submit="submit"
        >
          <base-input
            class="mb-5 mt-5"
            name="pokedex_creature"
            :label="'Pokedex creature'"
            :type="'number'"
            :isMandatory="false"
          />

          <base-input
            class="mb-5"
            name="trainer"
            :label="'Trainer'"
            :type="'number'"
            :isMandatory="false"
          />

          <base-input
            class="mb-5"
            name="nickname"
            :label="'Nickname'"
            :type="'text'"
            :isMandatory="false"
          />

          <base-input
            class="mb-5"
            name="experience"
            :label="'Experience'"
            :type="'number'"
            :isMandatory="false"
          />
        </base-form>
      </base-modal>
      <base-toaster
        v-model="toasterDisplay"
        :text="toasterText"
        :error="toasterError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from "@/components/ui/BaseLoader.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseForm from "@/components/ui/BaseForm.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseToaster from "@/components/ui/BaseToaster.vue";
import PokemonList from "@/components/pokemon/PokemonList.vue";
import { AddPokemon } from "@/interfaces/Pokemon";
import { usePokemonStore } from "@/store/pokemon";
import { useToasterStore } from "@/store/toaster";
import { ref, onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";

const pokemonStore = usePokemonStore();
const toasterStore = useToasterStore();

const { toasterDisplay, toasterText, toasterError } = storeToRefs(toasterStore);
const loading = ref(false);
const openModal = ref(false);

const initialValues = reactive<AddPokemon>({
  pokedex_creature: 0,
  trainer: 0,
  nickname: "",
  experience: 0,
});

onMounted(async () => {
  loading.value = true;
  await pokemonStore.getPokemons();
  loading.value = false;
});

const submit = async (val: unknown) => {
  const formValue = val as AddPokemon;
  await pokemonStore.addPokemon(formValue);
  openModal.value = false;
};
</script>

<style lang="scss" scoped>
.home-view {
  &__content {
    &__button {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
