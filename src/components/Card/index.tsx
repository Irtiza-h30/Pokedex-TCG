import { Card as AntdCard } from "antd";
import { Link } from "react-router-dom";

import { PokemonCard } from "interfaces";

import styles from "./index.module.scss";

interface CardProps {
  card: PokemonCard;
}

const bodyStyle = {
  display: "none",
};

// Display the Pokémon Cards on the home page
const Card = ({ card }: CardProps) => {
  return (
    <Link to={`/${card.id}`}>
      <AntdCard
        bordered={false}
        className={`${styles.card} `}
        cover={<img alt="Pokémon Card" src={card?.images?.small} />}
        bodyStyle={bodyStyle}
      />
    </Link>
  );
};

export default Card;
