const obtenerDatosAnimales = (() => {
  const BASE_URL = "http://127.0.0.1:5501//animales.json";

  const getData = async (url = BASE_URL) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Hubo un error:", error);
    }
  };

  return { getData };
})();

export default obtenerDatosAnimales;
