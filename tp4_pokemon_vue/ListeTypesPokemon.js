export default {
  props: {
    typesCount: Object, // Changer le nom de la prop
  },
  computed: {
    typesCount() {
      const typesCount = {};

      this.pokemonList.forEach((pokemon) => {
        const primaryType = pokemon.apiTypes[0].name;

        if (typesCount[primaryType]) {
          typesCount[primaryType]++;
        } else {
          typesCount[primaryType] = 1;
        }
      });

      return typesCount;
    },
  },
};