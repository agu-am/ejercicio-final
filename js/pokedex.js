const myFavs = JSON.parse(localStorage.getItem("favPokemon"));
const allPokemon = [];

function fetchPokemon(pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(res => res.json())
        .then(data => {
            const pokemon = {
                name: data.name,
                id: data.id,
                image: data.sprites.front_default,
                type: data.types.map(type => type.type.name).join(", "),
                isFav: false
            };
            showPokemon(pokemon);
            allPokemon.push(pokemon);
        });
}

const containerPokemon = document.querySelector('#container-pokemon');

for (let i = 1; i < 150; i++) {
    fetchPokemon(i);
}

function showPokemon(pokemon) {
    const cardPokemon = generateCardPokemon(pokemon);
    containerPokemon.innerHTML += cardPokemon;
}

function generateCardPokemon(pokemon) {
    const isFavorite = myFavs && myFavs.some((favPokemon) => favPokemon.id === pokemon.id);
    const btnFav = isFavorite ? "btnRemove" : "btnAddFav";
    const btnText = isFavorite ? "Remove" : "Add to favs";
    const cardPokemon = `
        <article class="card-pokemon">
            <figure>
                <img src="${pokemon.image}">
            </figure>
            <p class="card-pokemon-name">${pokemon.name}</p>
            <p class="card-pokemon-type">Type: ${pokemon.type}</p>
            <button class="${btnFav}" onclick="addFavs(${pokemon.id}, this)">${btnText}</button>
         </article>
    `;
    return cardPokemon;
}

const inputBuscar = document.querySelector('#inputBuscar')
inputBuscar.addEventListener("input", searchPokemon);

function searchPokemon() {
    const inputBuscar = document.querySelector('#inputBuscar')
    const resultadoBuscar = inputBuscar.value.toLocaleLowerCase();

    containerPokemon.innerHTML = "";

    allPokemon.filter(pokemon => {
        return pokemon.name.includes(resultadoBuscar)
    }).map(pokemon => { showPokemon(pokemon) })
}

function addFavs(idPokemon, button) {
  const pokemon = allPokemon.find(pokemon => pokemon.id === idPokemon);
  
  if (pokemon) {
    const pokemonExists = myFavs && myFavs.some(p => p.id === pokemon.id);
    if (!pokemonExists) {
      myFavs.push(pokemon);
      localStorage.setItem("favPokemon", JSON.stringify(myFavs));
      button.classList.add("btnRemove");
      button.textContent = "Remove";
      pokemon.isFav = false;
    } else {
      const index = myFavs.findIndex(p => p.id === pokemon.id);
      myFavs.splice(index, 1);
      localStorage.setItem("favPokemon", JSON.stringify(myFavs));
      button.classList.remove("btnRemove");
      button.classList.add("btnAddFav");
      button.textContent = "Add to favs";
      pokemon.isFav = true;
    }
  }
}