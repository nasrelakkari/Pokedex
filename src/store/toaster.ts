import { defineStore } from "pinia";

export const useToasterStore = defineStore("toasterStore", {
  state: () => ({
    toasterDisplay: false,
    toasterText: "",
    toasterError: false,
  }),
  actions: {
    launchToaster(text: string, error = false) {
      this.toasterText = text;
      this.toasterDisplay = true;
      this.toasterError = error;
    },
  },
});
