// fetch('https://randomuser.me/api')
//   .then((response) => response.json())
//   .then((result) => console.log(result)); // This is not turning the response into JSON. it's turning the response into a javascript object
import pokemonTypes from "./pokemonTypes.js";

const requestUser = async () => {
    const response = await fetch("https://randomuser.me/api");
    // turn JSON body into javascript object
    const data = await response.json();
    return data;
};

const requestPokemon = async () => {
    const randomID = Math.floor(Math.random() * 1010) + 1;
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomID}`
    );
    const data = await response.json();
    return data;
};

document.querySelector("button").addEventListener("click", async (e) => {
    const userData = await requestUser().catch((err) => console.log(err));
    const pokemonData = await requestPokemon().catch((err) => console.log(err));
    const cardCon = document.querySelector(".card--container");
    cardCon.classList.remove("hidden");
    createPokemonCard(userData, pokemonData);
});

const createPokemonCard = (userData, pokemonData) => {
    const userInfo = userData.results[0];
    const pokemonHpStats = pokemonData.stats[0]["base_stat"];
    const pokemonAttStats = pokemonData.stats[1]["base_stat"];
    const pokemonSpAttStats = pokemonData.stats[3]["base_stat"];
    const cardCon = document.querySelector(".card--container");
    cardCon.style.backgroundColor = `${pokemonType(pokemonData).colour}`;
    cardCon.innerHTML = `
  <header class="title">
    <img src="${userInfo.picture.thumbnail}" class="thumbnail">
    <h3>
    ${userInfo.login.username.replace(/[a-z]/, (v) => {
        return v.toUpperCase();
    })}
    </h3>
    <p>${pokemonHpStats}HP</p>
    <div class="type">
      <img src="${pokemonType(pokemonData).src}" >
    <div>
  </header>
  <main>
    <img src="${userInfo.picture.large}">
  </main>
  <footer class="description">
    <ul>
      <li>
        <h5>${pokemonMove(pokemonData).replace(/[a-z]/, (v) => {
            return v.toUpperCase();
        })}</h5>
        <p>${pokemonAttStats}</p>
      </li>
      <li>
        <h5>${pokemonMove(pokemonData).replace(/[a-z]/, (v) => {
            return v.toUpperCase();
        })}</h5> 
        <p>${pokemonSpAttStats}</p>
      </li>
    </ul>
  </footer>
  `;
};

const pokemonMove = (pokemonData) => {
    const moves = pokemonData.moves;
    const randomNumber = Math.floor(Math.random() * moves.length);
    return moves[randomNumber].move.name;
};

const pokemonType = (pokemonData) => {
    const types = pokemonData.types;
    const randomNumber = Math.floor(Math.random() * types.length);
    const type = types[randomNumber].type.name;
    return pokemonTypes[type];
};

// <i class="fa-solid fa-star-of-life"></i>
