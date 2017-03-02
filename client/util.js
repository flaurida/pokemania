const Util = {
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  randomRadius() {
    return Math.floor(Math.random() * (20 - 5)) + 5;
  },

  randomVelocity() {
    return [
      this.randomVelocityPiece(),
      this.randomVelocityPiece()
    ];
  },

  randomVelocityPiece() {
    return Math.floor(Math.random() * (1.2 + 1.2)) - 1.2;
  },

  randomPokemonId() {
    return POKEMON_IDS[Math.floor(Math.random() * POKEMON_IDS.length)];
  },

  randomPlayerName() {
    return POKEMON_CHARACTER_NAMES[Math.floor(Math.random() * POKEMON_CHARACTER_NAMES.length)];
  }
};

const POKEMON_IDS = [
  1, 4, 7, 24, 29, 34, 147, 155, 220, 304
];

const POKEMON_CHARACTER_NAMES = [
  "Misty",
  "Lass",
  "Serena",
  "Bonnie",
  "Iris",
  "Jessie",
  "Lillie",
  "May",
  "Dawn",
  "Moon",
  "Mallow",
  "Sakura",
  "Shauna",
  "Candela",
  "Officer Jenny",
  "Aria",
  "Olivia",
  "Lusamine",
  "Lana",
  "Professor Ivy",
  "Mom",
  "Sabrina",
  "Viola",
  "Daisy",
  "Bianca",
  "Sumomo",
  "Blanche",
  "Agatha",
  "Georgia",
  "Grace",
  "Malva",
  "Karen"
];

export default Util;
