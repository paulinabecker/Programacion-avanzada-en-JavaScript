import { Leon, Lobo, Oso, Serpiente, Aguila } from "./classes.js";
import { getAnimales } from "./apiController.js";
import { mostrarDetallesAnimal } from "./modal.js";

const animal = document.querySelector("#animal");
const edad = document.querySelector("#edad");
const comentarios = document.querySelector("#comentarios");
const preview = document.querySelector("#preview");
const btnAgregar = document.querySelector("#btnRegistrar");
let formulario = {};
let datosAnimales = "";
let instanciaAnimal = "";

const limpiarTagPreview = () => {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
};

(async () => {
  datosAnimales = await getAnimales();
  const instanciarFormulario = (e) => {
    formulario = { ...formulario, [e.target.id]: e.target.value };
  };
  animal.addEventListener("change", (e) => {
    instanciarFormulario(e);
    switch (formulario.animal) {
      case "Leon":
        instanciaAnimal = new Leon(
          formulario.animal,
          formulario.edad,
          "http://localhost:5500/assets/imgs/" +
            datosAnimales.animales[0].imagen,
          formulario.comentarios,
          "http://localhost:5500/assets/sounds/" +
            datosAnimales.animales[0].sonido
        );
        break;
      case "Lobo":
        instanciaAnimal = new Lobo(
          formulario.animal,
          formulario.edad,
          "http://localhost:5500/assets/imgs/" +
            datosAnimales.animales[1].imagen,
          formulario.comentarios,
          "http://localhost:5500/assets/sounds/" +
            datosAnimales.animales[1].sonido
        );
        break;
      case "Oso":
        instanciaAnimal = new Oso(
          formulario.animal,
          formulario.edad,
          "http://localhost:5500/assets/imgs/" +
            datosAnimales.animales[2].imagen,
          formulario.comentarios,
          "http://localhost:5500/assets/sounds/" +
            datosAnimales.animales[2].sonido
        );
        break;
      case "Serpiente":
        instanciaAnimal = new Serpiente(
          formulario.animal,
          formulario.edad,
          "http://localhost:5500/assets/imgs/" +
            datosAnimales.animales[3].imagen,
          formulario.comentarios,
          "http://localhost:5500/assets/sounds/" +
            datosAnimales.animales[3].sonido
        );
        break;
      case "Aguila":
        instanciaAnimal = new Aguila(
          formulario.animal,
          formulario.edad,
          "http://localhost:5500/assets/imgs/" +
            datosAnimales.animales[4].imagen,
          formulario.comentarios,
          "http://localhost:5500/assets/sounds/" +
            datosAnimales.animales[4].sonido
        );
        break;
      default:
        console.error("Animal no reconocido");
        break;
    }
    
    limpiarTagPreview();
    let tagImg = document.createElement("img");
    tagImg.setAttribute("src", instanciaAnimal.getImg());
    preview.appendChild(tagImg);

    edad.addEventListener("change", (e) => {
      instanciarFormulario(e);
    });
    comentarios.addEventListener("change", (e) => {
      instanciarFormulario(e);
    });
    console.log(instanciaAnimal);
  });
  btnAgregar.addEventListener("click", () => {
    const animalSeleccionado = animal.value;
    const edadAnimal = edad.value;
    const comentariosAnimal = comentarios.value;

    /* Validar si alguno de los campos está vacío*/
    if (
      animalSeleccionado === "" ||
      edadAnimal === "" ||
      comentariosAnimal === ""
    ) {
      alert("Debe rellenar todos los campos");
      return;
    }
  /* Aca se inserta el card en id Animales y se inserta la ruta de la imagen y sonido directamente utilizando un metodo find se busca el objeto y se desplaza hacia imagen y sonido respectivamente usando name como guia. */
    const datosAnimalSeleccionado = datosAnimales.animales.find(
      (animal) => animal.name === animalSeleccionado
    );
    if (datosAnimalSeleccionado) {
      const card = document.createElement("div");
      card.classList.add("card", "m-2", "bg-light");
      card.setAttribute("id", "animalCard");
      card.innerHTML = ` 
        <img src="http://127.0.0.1:5500/assets/imgs/${datosAnimalSeleccionado.imagen}" alt="${animalSeleccionado}">
        <button class="btn btn-secondary play-sound" data-audio="http://127.0.0.1:5500/assets/sounds/${datosAnimalSeleccionado.sonido}"><i class="fa-solid fa-volume-high"></i></button>
      `;
      card.addEventListener("click", () => {
        const nombreAnimal = animalSeleccionado;
        const edadAnimal = edad.value;
        const imagenAnimal = `http://127.0.0.1:5500/assets/imgs/${datosAnimalSeleccionado.imagen}`;
        const comentariosAnimal = comentarios.value;
        mostrarDetallesAnimal(
          nombreAnimal,
          edadAnimal,
          imagenAnimal,
          comentariosAnimal
        );
      });
      document.getElementById("Animales").appendChild(card);
      document.getElementById("Animales").appendChild(card);
    } else {
      console.error(
        `No se encontró el animal ${animalSeleccionado} en los datos.`
      );
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("play-sound")) {
      const audioUrl = event.target.getAttribute("data-audio");
      const audio = new Audio(audioUrl);
      audio.play();
    }
  });
})();
