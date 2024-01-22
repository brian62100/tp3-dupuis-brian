import ListeTypesPokemon from './ListeTypesPokemon.js';

// forma des données pour la carte pokemon
Vue.component('pokemon-card', {
  props: ['pokemonData'],
  template: `
    <div :class="['pokemon-card', pokemonData.apiTypes[0].name.toLowerCase() + '-type']">
      <h2>{{ pokemonData.name }}</h2>
      <img :src="pokemonData.image" alt="Pokemon Image">
      <div class="pokemon-type">
        <div>{{ pokemonData.apiTypes[0].name }}</div>
        <img :src="pokemonData.apiTypes[0].image" alt="Type Image">
      </div>
      <p>Génération {{ pokemonData.apiGeneration }}</p>
    </div>
  `
});


Vue.component('pokedex', {
  props: ['pokemonList'],
  template: `
    <div>
      <pokemon-card v-for="pokemon in pokemonList" :key="pokemon.name" :pokemon-data="pokemon"></pokemon-card>
    </div>
  `
});

// permet de recuper le donné de api et de signaler si il y a une erreur dans la recuperation des donnés
new Vue({
  el: '#app',
  components: {
    'liste-types-pokemon': ListeTypesPokemon,
  },
  data: {
    pokemonList: [],
    desiredPokemonCount: 20,
    selectedGeneration: 0,
  },
  computed: {
    filteredPokemonList() {
      if (!this.pokemonList) {
        return [];
      }
    
      if (this.selectedGeneration === 0) {
        return this.pokemonList;
      } else {
        return this.pokemonList.filter(pokemon => pokemon.apiGeneration && pokemon.apiGeneration === this.selectedGeneration);
      }
    },
    generations() {
      const uniqueGenerations = [...new Set(this.pokemonList ? this.pokemonList.map(pokemon => pokemon.apiGeneration) : [])];
      
      return uniqueGenerations.map(gen => ({ value: gen, label: `Génération ${gen}` }));
    },
  },
  methods: {
    fetchPokemonData() {
      fetch(`https://pokebuildapi.fr/api/v1/pokemon/limit/${this.desiredPokemonCount}`)
        .then(response => response.json())
        .then(data => {
          console.log('Données récupérées:', data);
          this.pokemonList = data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données de l\'API:', error);
        });
    },
  },
  mounted() {
    this.fetchPokemonData();
  },
});