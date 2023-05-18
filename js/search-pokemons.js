// function fetchPokemon(pokemonId) {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
//         .then(res => res.json())
//         .then(data => {
//             const cardPokemon = `
//             <article class="card-pokemon">
//                 <img src="${data.sprites.front_default}">
//                 <p>"${data.name}"</p>
//                 <p>Type:"${data.types.map(element => element.type.name)}"</p>
//                 <button>Add to favs</button>
//                 </article>
//             `
//             const containerPokemon = document.querySelector('#container-pokemon');
//             containerPokemon.innerHTML += cardPokemon;
//             console.log(data);
//         });
// }

// const allPokemon = [];

// for (let i = 1; i < 150; i++) {
//     allPokemon.push(fetchPokemon(i))
// }
// const containerPokemon = document.querySelector('#container-pokemon');


// const inputBuscar = document.querySelector('#inputBuscar')
// inputBuscar.addEventListener("input", searchPokemon());

// function searchPokemon() {
//     const inputBuscar = document.querySelector('#inputBuscar')
//     const resultadoBuscar = inputBuscar.value.toLocaleLowerCase();

//     containerPokemon.innerHTML = "";

//     allPokemon.filter(pokemon => {
//         return pokemon.name.includes(resultadoBuscar)
//     }).map(pokemon => {
//         const cardPokemon = `
//             <article class="card-pokemon">
//                 <img src="${pokemon.sprites.front_default}">
//                 <p>"${pokemon.name}"</p>
//                 <p>Type:"${pokemon.types.map(element => element.type.name)}"</p>
//                 <button>Add to favs</button>
//                 </article>
//             `
//             containerPokemon.innerHTML += cardPokemon;
//     })
// }

const allPokemon = [];

function fetchPokemon(pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(res => res.json())
        .then(data => {
            const pokemon = {
                name: data.name,
                id: data.id,
                image: data.sprites.front_default,
                type: data.types.map(type => type.type.name).join(", ")
            };
            showPokemon(pokemon);
            allPokemon.push(pokemon);
        });
}

const containerPokemon = document.querySelector('#container-pokemon');

for (let i = 1; i < 150; i++) {
    fetchPokemon(i)
}

function showPokemon(pokemon) {
    const cardPokemon = `
        <article class="card-pokemon">
            <img src="${pokemon.image}">
            <p>"${pokemon.name}"</p>
            <p>Type:"${pokemon.type}"</p>
            <button>Add to favs</button>
         </article>
    `
    containerPokemon.innerHTML += cardPokemon;
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