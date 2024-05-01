let url = "http://localhost:5500/animales.json";

/* Consulta a la API */
export const getAnimales = async () => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
