interface SetInfo {
  id?: string;
  name?: string;
  series?: string;
  printedTotal?: number;
  total?: number;
  legalities?: {
    unlimited?: string;
    standard?: string;
    expanded?: string;
  };
  ptcgoCode?: string;
  releaseDate?: string;
  updatedAt?: string;
  images?: {
    small?: string;
    large?: string;
  };
}

interface CardmarketInfo {
  url?: string;
  updatedAt?: string;
  prices?: {
    trendPrice: string;
  };
}

export interface PokemonCard {
  id: string;
  name: string;
  images?: {
    small?: string;
    large?: string;
  };
  supertype?: string;
  subtypes?: string[];
  types?: string[];
  set?: SetInfo;
  number?: string;
  artist?: string;
  rarity?: string;
  cardmarket?: CardmarketInfo;
  evolvesFrom?: string;
  evolvesTo?: string;
}
