import router from "@/router";

export const useNavigation = () => {
  const goToPage = (
    name: string,
    params?: { [k: string]: string | number }
  ) => {
    router.push({ name, params });
  };

  return { goToPage };
};
