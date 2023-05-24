const containerFavs = document.querySelector('#container-fav-pokemon')
const myFavs = JSON.parse(localStorage.getItem("favPokemon"));

function showPokemon(pokemon) {
    const cardPokemon = generateCardPokemon(pokemon);
    containerFavs.innerHTML += cardPokemon;
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

function addFavs(idPokemon, button) {
  const pokemon = myFavs.find(pokemon => pokemon.id === idPokemon);

  if (pokemon) {
      const pokemonExists = myFavs.some(p => p.id === pokemon.id);
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
          pokemon.isFav = true;
          
          const cardPokemon = button.parentNode;
          if (cardPokemon && cardPokemon.classList.contains("card-pokemon")) {
              cardPokemon.remove();
          }
      }
  }
}

myFavs.map(pokemon => {
    showPokemon(pokemon)
})