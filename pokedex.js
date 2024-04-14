const pokemonList$$ = document.querySelector("#pokemonList");    // Selecciona el id pokemonlist donde se mostrarán los Pokémon.
const typeButtons = document.querySelectorAll(".btn-header");   // Selecciona todos los botones con la clase btn-header.




let url1 = "https://pokeapi.co/api/v2/pokemon/";






// PETICION A LA API
const getAllPokemons = async () => {  
  let pokemons = []; // creo un array vacia para almacenar mis pokemons
  for (i = 1; i < 151; i++) { // creo un bucle para iterar en las 151 paginas que tiene la api https://pokeapi.co/api/v2/pokemon/1, 2 etc"
      const response = await fetch(url1 + i); // le digo que me de las 151 y espero a la respuesta
      const res = await response.json(); // convierto la respuesta a un json y guardo la respuesta en res
      pokemons.push(res);// empujo los primeros 150 de la respuesta del bucle y los meto en mi array vacia pòkemons
      

  }
  return pokemons; // devuelvo el valor a getPokemons
};



// CALCULO PESO Y ALTURA
const calcWeightHeight = (calcularPesoAltura) => {
  const piesAMetros = 0.3048; // 1 pie = 0.3048 metros
  const librasAKilogramos = 0.453592; // 1 libra = 0.453592 kilogramos
    
  const alturaMetros = (calcularPesoAltura.height * piesAMetros).toFixed(2); 
  const pesoKilogramos = (calcularPesoAltura.weight * librasAKilogramos).toFixed(1);
  
  return {
    heightMeters: alturaMetros,
    weightKilograms: pesoKilogramos,
  };
};



// ESCOGIENDO ATRIBUTOS
const mapPokemons = ({ name, sprites, types, id, height, weight }) => {
    const image = sprites['front_default']; // Obtiene la URL de la imagen del Pokémon.
    const type = types.map((type) => type.type.name.toLowerCase()); // Obtiene los tipos del Pokémon y los convierte en minusculas
    const { heightMeters, weightKilograms } = calcWeightHeight({ height, weight }); // recoge los datos de la altura y el peso.
    return {
        name,
        image,
        type,
        id,
        height: heightMeters,
        weight: weightKilograms
    };
};



// COLOCANDO PERSONAJES EN HTML
  const paintPokemons = (pokemons) => {
    pokemonList$$.innerHTML = "";   //Limpia el contenido anterior de la lista de Pokémon.
    
    
    
    for (const pokemon of pokemons) {  // Recorre cada Pokémon y crea su representación HTML.
      
      let pokemonDiv$$ = document.createElement("div"); // Crea un elemento div para el Pokémon.
      pokemonDiv$$.className = "pokemon";              // Le asigna la clase "pokemon" al div.
      
      
      pokemonList$$.appendChild(pokemonDiv$$); // Agrega el div del Pokémon al contenedor pokemonList$$ en el HTML.
      pokemonDiv$$.innerHTML = `  
        
      <div class="idPokemon">
      <img class="imgPokemons" src="${pokemon.image}" alt="">
  </div>
  <div class="infoPokemon">
      <h2 class="idPokemon">${pokemon.id}</h2>
      <h2 class="namePokemon">${pokemon.name}</h2>
  </div>
  <div class="tipoPoder">
      ${pokemon.type.map(type => `<span class="${type}">${type}</span>`).join('')}
  </div>
  <div class="datosPokemon">
      <div class="alturaYpeso">
          <h3>Altura</h3>
          <p>${pokemon.height} M</p>
      </div>
      <div class="alturaYpeso">
          <h3>Peso</h3>
          <p>${pokemon.weight} Kg</p>
      </div>
  </div>`;
      
    }
  };  



  // CONFIGURANDO INPUT
  const drawInput = (pokemons) => {
    const inputElement = document.querySelector("#input"); // Selecciona el input de búsqueda.

    inputElement.addEventListener("input", (event) => {     // Escucha el evento de entrada en el input.
        const searchTerm = event.target.value.toLowerCase(); // Obtiene el término de búsqueda.
        const filteredPokemons = pokemons.filter(pokemon => // Filtra los Pokémon por el término de búsqueda.
        pokemon.name.toLowerCase().includes(searchTerm) // Verifica si el nombre del Pokémon contiene el término de búsqueda en minúsculas.
        );
        paintPokemons(filteredPokemons); // Muestra los Pokémon filtrados en el HTML.
    });
  };

   
  // CONFIGURANDO BOTONES
  
  const addTypeButtonClickEvent = (pokemons) => {
    typeButtons.forEach(button => { //La función forEach se utiliza para recorrer cada botón.
        button.addEventListener("click", () => { //Para cada botón, se agrega un evento de clic que se activa cuando se hace clic en el botón.
            let type = button.textContent.toLowerCase(); // Convertir el tipo del botón a minúsculas
            console.log("Tipo seleccionado:", type); // Verifica el tipo seleccionado en la consola.

            if (type === "ver todos") {
                paintPokemons(pokemons); // Mostrar todos los Pokémon sin filtrar
            } else {
                // Filtrar los Pokémon ya mapeados por tipo
                const filteredPokemons = pokemons.filter(pokemon =>
                    pokemon.type.includes(type)
                );

                console.log("Pokemones filtrados:", filteredPokemons); // Verificar los Pokémon filtrados en la consola
                paintPokemons(filteredPokemons); // Muestra los Pokémon filtrados en el HTML.
            }
        });
    });
};



 


const init = async () => {
    
    const pokemonsSinMapear = await getAllPokemons(); // Obtengo todos los Pokémon de la API.
    console.log("pokemon sin mapear",pokemonsSinMapear);
    
  
    
    const pokemonsMapeados = pokemonsSinMapear.map(mapPokemons);  // Mapea la información de los Pokémon.
    console.log("pokemons mapeados",pokemonsMapeados);

   paintPokemons(pokemonsMapeados); // Muestra el calculo del peso y altura Pokémon en el HTML.


    drawInput(pokemonsMapeados);    // Busqueda por nombre.

    addTypeButtonClickEvent(pokemonsMapeados);  // Busca los pokemons por el tipo de poder.
    
  };
  
  init();

















  // SE HA INTENTADO


// let prevBtn$ = addEventListener('click', goToPage);
// let nextBtn$ = addEventListener('click', goToPage);
// let pokemonsMapeados = [];
// let itemsPerPage = 9;
// let currentPage = 1;



// const prevPage = () => {
//     if (currentPage > 1) {
//         currentPage--;
//         console.log("Página anterior. Nueva página actual:", currentPage);
//         paintPokemons(pokemonsMapeados);
//     } else {
//         console.log("Ya estás en la primera página");
//     }
// };

// const nextPage = () => {
//     const totalPages = Math.ceil(pokemonsMapeados.length / itemsPerPage);
//     if (currentPage < totalPages) {
//         currentPage++;
//         console.log("Página siguiente. Nueva página actual:", currentPage);
//         paintPokemons(pokemonsMapeados);
//     } else {
//         console.log("Ya estás en la última página");
//     }
// };

// const setupPagination = () => {
//     const prevButton = document.querySelector("#prevButton");
//     const nextButton = document.querySelector("#nextButton");

//     prevButton.addEventListener("click", () => {
//         prevPage();
//     });
//     nextButton.addEventListener("click", () => {
//         nextPage();
//     });
// };
     









//OPCION 2


  // CAMBIAR DE PAGINA

/*
// function goToPage () {
//     let newUrl = this.getAttribute('data-url');
//     let newPage = this.getAttribute('data-goToPage');
//     console.log(newUrl);
//     console.log(newPage);
// }
*/

// DESABILITAR/HABILITAR BOTONES SEGUN PAGINA

/*
// const refresPage = (info) => {
//     let currentPage$$ = document.querySelector('#currentPage');
//     let currentPage = parseInt(currentPage$$.textContent);
//     let prevBtn$ = document.querySelector('#prevButton');
//     let nextBtn$ = document.querySelector('#nextButton');

//     if(info.prev == null) {
//         prevBtn$.setAttribute('disabled', 'disabled');
//         prevBtn$.removeAttribute('data-goToPage');
//     }else {
//         prevBtn$.removeAttribute('disabled');
//         prevBtn$.setAttribute('data-goToPage', currentPage -1);
//     }
//     prevBtn$.setAttribute('data-url', info.prev);


//     if(info.next == null) {
//         nextBtn$.setAttribute('disabled', 'disabled');
//         nextBtn$.removeAttribute('data-goToPage');
//     }else {
//         nextBtn$.removeAttributeNode('disabled');
//         nextBtn$.setAttribute('data-goToPage', currentPage +1);
//     }
//     nextBtn$.setAttribute('data-url', info.next);
// };
*/

