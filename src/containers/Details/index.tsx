import { useEffect } from "react";
import { Spin, Typography, Card, Tag } from "antd";
import { Link, useParams } from "react-router-dom";

import styles from "./index.module.scss";
import BackButton from "components/BackButton";
import { PokemonCard } from "interfaces";
import NoResultsFound from "components/NoResultsFound";
import useFetchData from "hooks/useFetchData";

const { Title, Text } = Typography;

interface PokemonCardData {
  data: PokemonCard;
}

const Details = () => {
  const { id } = useParams();
  const { response, isLoading, fetchData } = useFetchData<PokemonCardData>({
    data: {
      id: "",
      name: "",
      images: {},
      set: {},
      cardmarket: {},
    },
  });
  const { data } = response;

  useEffect(() => {
    fetchData(`https://api.pokemontcg.io/v2/cards/${id}`);
  }, [id, fetchData]);

  const {
    name,
    rarity,
    artist,
    images,
    set,
    cardmarket,
    evolvesFrom,
    evolvesTo,
  } = data;

  const renderLabel = (
    label: string,
    value: string | number | undefined,
    color: string,
    link: boolean = false
  ) => {
    if (!value) return;

    return (
      <div className={styles.label}>
        <Text type="secondary">{label}:</Text>
        {link ? (
          <Link to={`/?name=${value}`}>{value}</Link>
        ) : (
          <Tag color={color}>{value}</Tag>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <Spin fullscreen size="large" />;
  }

  return (
    <div className={styles.container}>
      <BackButton />
      {!name ? (
        <NoResultsFound />
      ) : (
        <div className={styles.wrapper}>
          <img
            className={styles.image}
            src={images?.large}
            alt="Pokémon Card"
          />
          <Card
            className={styles.card}
            title={<Title type="secondary">{name}</Title>}
            loading={isLoading}
          >
            <div className={styles.inner}>
              {renderLabel("Series", set?.series, "magenta")}
              {renderLabel("Name", set?.name, "red")}
              {renderLabel("Printed Total", set?.printedTotal, "volcano")}
              {renderLabel("Rarity", rarity, "orange")}
              {renderLabel("Artist", artist, "gold")}
              {renderLabel("Release Date", set?.releaseDate, "orange")}
              {renderLabel(
                "Trending Price",
                `$${cardmarket?.prices?.trendPrice ?? 0.0}`,
                "green"
              )}

              {renderLabel("Evolves From", evolvesFrom, "cyan", true)}
              {renderLabel("Evolves To", evolvesTo, "blue", true)}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Details;
