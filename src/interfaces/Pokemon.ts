export interface Pokemon {
  experience: number;
  id: number;
  level: number;
  nickname: string;
  pokedex_creature: number | PokedexCreature;
  trainer: number | Trainer;
  picture?: string;
}

export interface PokemonDetail extends Pokemon {
  pokedex_creature: PokedexCreature;
  trainer: Trainer;
}

export interface PokedexCreature {
  id: number;
  name: string;
  ref_number: number;
  generation: number;
  legendary: boolean;
  type_1: string;
  type_2: string;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defence: number;
  speed: number;
}

export interface Trainer {
  id: number;
  username: string;
  email: string;
}

export interface AddPokemon {
  pokedex_creature: number;
  trainer: number;
  nickname: string;
  experience: number;
}
