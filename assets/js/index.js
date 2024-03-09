import { Leon, Lobo, Oso, Serpiente, Aguila } from "./animal class.js";
import ModuloApi from "./animal.js";

const dataAnimal = await ModuloApi.getData();

const animal = document.querySelector("#animal");
const edad = document.querySelector("#edad");
const comentarios = document.querySelector("#comentarios");
const btnReg = document.getElementById("btnRegistrar");
const imagenPreview = document.createElement("img");

let instanciaNueva = "";

let formulario = {};

function onChangeInput(event) {
  formulario = { ...formulario, [event.target.id]: event.target.value };
}

animal.addEventListener("change", (event) => {
  onChangeInput(event);
  switch (formulario.animal) {
    case "Leon":
      instanciaNueva = new Leon(
        formulario.animal,
        formulario.edad,
        "http://127.0.0.1:5501//assets/imgs/" + dataAnimal.animales[0].imagen,
        formulario.comentarios,
        "http://127.0.0.1:5501//assets/sounds/" + dataAnimal.animales[0].sonido
      );
      break;
    case "Lobo":
      instanciaNueva = new Lobo(
        formulario.animal,
        formulario.edad,
        "http://127.0.0.1:5501//assets/imgs/" + dataAnimal.animales[1].imagen,
        formulario.comentarios,
        "http://127.0.0.1:5501//assets/sounds/" + dataAnimal.animales[1].sonido
      );
      break;
    case "Oso":
      instanciaNueva = new Oso(
        formulario.animal,
        formulario.edad,
        "http://127.0.0.1:5501//assets/imgs/" + dataAnimal.animales[2].imagen,
        formulario.comentarios,
        "http://127.0.0.1:5501//assets/sounds/" + dataAnimal.animales[2].sonido
      );
      break;
    case "Serpiente":
      instanciaNueva = new Serpiente(
        formulario.animal,
        formulario.edad,
        "http://127.0.0.1:5501//assets/imgs/" + dataAnimal.animales[3].imagen,
        formulario.comentarios,
        "http://127.0.0.1:5501//assets/sounds/" + dataAnimal.animales[3].sonido
      );
      break;
    case "Aguila":
      instanciaNueva = new Aguila(
        formulario.animal,
        formulario.edad,
        "http://127.0.0.1:5501//assets/imgs/" + dataAnimal.animales[4].imagen,
        formulario.comentarios,
        "http://127.0.0.1:5501//assets/sounds/" + dataAnimal.animales[4].sonido
      );
      break;
    default:
      console.error("Tipo de animal no reconocido");
      return;
  }
  imagenPreview.src = instanciaNueva.getImg();
  document.querySelector("#preview").appendChild(imagenPreview);

  console.log(event.target.value);
});
edad.addEventListener("change", (event) => {
  onChangeInput(event);
  console.log(event.target.value);
});
comentarios.addEventListener("change", (event) => {
  onChangeInput(event);
  console.log(event.target.value);
});

btnReg.addEventListener("click", (event) => {
  const card = `
    <div class = "card">
    <img src="${instanciaNueva.getImg()}">
    <audio src="${instanciaNueva.getSonido()}" controls>
    </audio>
    </div>`;
    document.querySelector("#Animales").innerHTML += card;
});