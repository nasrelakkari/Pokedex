import axios from "axios";

const apiUrl = "https://pokedexbe-akd7k.dev.simco.io/api/";

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401) {
      const token = window.localStorage.getItem("refresh");
      const res = await axios.post(`${apiUrl}token/refresh/`, {
        refresh: token,
      });

      if (res.status === 200) {
        window.localStorage.setItem("access", res.data.access);
      }
    }
    return error;
  }
);
