export interface PokemonCard {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  supertype?: string;
  subtypes?: string[];
  types?: string[];
  set?: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
      unlimited: string;
      standard: string;
      expanded: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      small: string;
      large: string;
    };
  };
  number?: string;
  artist?: string;
  rarity?: string;
  cardmarket?: {
    url: string;
    updatedAt: string;
    prices: {
      trendPrice: string;
    };
  };
  evolvesFrom?: string;
  evolvesTo?: string;
}
