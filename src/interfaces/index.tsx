export interface PokemonCard {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  supertype?: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  abilities?: {
    name: string;
    text: string;
    type: string;
  }[];
  attacks?: {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
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
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  cardmarket?: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice: string;
      lowPrice: string;
      trendPrice: string;
      germanProLow: string;
      suggestedPrice: string;
      reverseHoloSell: string;
      reverseHoloLow: string;
      reverseHoloTrend: string;
      lowPriceExPlus: string;
      avg1: string;
      avg7: string;
      avg30: string;
      reverseHoloAvg1: string;
      reverseHoloAvg7: string;
      reverseHoloAvg30: string;
    };
  };
  evolvesFrom?: string;
  evolvesTo?: string;
}
