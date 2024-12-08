const searchInput = document.getElementById('id-pokemon');
const searchButton = document.getElementById('search-button');
const pokemonName = document.querySelector('.pokemon-name');
const captureRate = document.querySelector('.capture-rate > span');
const family = document.querySelector('.pokemon-family > span');
const description = document.querySelector('.description');
const picture = document.querySelector('img.pokemon-picture');
const resultContainer = document.querySelector('.result');
const pokemonCard = document.querySelector('.pokemon-card');
const pokemonSpeciesApi = 'https://pokeapi.co/api/v2/pokemon-species/';
const pokemonPictureBase = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/%pokemonId%.png';

/* ----------Ecouteur d'évenements sur le click du bouton search ------------*/
searchButton.addEventListener('click', () => {
    const pokemonId = searchInput.value.trim();

    if(pokemonId<=0 || pokemonId >893){
        alert('Id pokemon incorrect');
        return;
    }

    fetch(`${pokemonSpeciesApi}/${pokemonId}`)
        .then(data => data.json())
        .then(pokemon => {
            resultContainer.style.display = "flex" // Display the result

            const frName = pokemon.names.find(name => name.language.name === 'fr').name;
            const frGenera = pokemon.genera.find(name => name.language.name === 'fr').genus;
            const frFlavorText = pokemon.flavor_text_entries.find(name => name.language.name === 'fr').flavor_text;

            pokemonName.textContent = `#${pokemonId} ${frName}`;
            captureRate.textContent = pokemon.capture_rate
            family.textContent = frGenera
            description.textContent = frFlavorText
            picture.src = pokemonPictureBase.replace('%pokemonId%', pokemonId.padStart(3, '0'))
            pokemonCard.style.borderColor = pokemon.color.name
        });
});
