import { useEffect, useMemo } from "react";
import { Alert, Layout, Spin, Typography } from "antd";

import { useColorTheme } from "contexts/ColorThemeContext";

import Card from "components/Card";
import Filter from "components/Filter";

import { MD_SCREEN_BREAKPOINT } from "constants";

import useQueryParams from "hooks/userQueryParams";
import useScreenSize from "hooks/useScreenSize";

import { PokemonCard } from "interfaces";

import styles from "./index.module.scss";
import NoResultsFound from "components/NoResultsFound";
import useFetchData from "hooks/useFetchData";

const { Sider } = Layout;
const { Title } = Typography;

interface ApiResponse {
  count: number;
  data: Array<PokemonCard>;
  totalCount: number;
}

// Utility function to format terms based on Lucene syntax
// Enclose all values in quotes and append OR operator between like terms
const formatTerms = (term: string, field: string) =>
  term
    .split(",")
    .map((item) => `${field}:"${item.trim().toLowerCase()}"`)
    .join(" OR ");

const Home = () => {
  const { isDarkMode } = useColorTheme();
  const { width } = useScreenSize();

  const { response, isLoading, fetchData } = useFetchData<ApiResponse>({
    count: 0,
    data: [],
    totalCount: 0,
  });

  const { data, totalCount } = response;

  const {
    name,
    types,
    subtypes,
    rarities,
    orderBy = "name",
    sortDirection = "asc",
  } = useQueryParams();

  // Format url to fetch Pokémon Cards from API
  const url = useMemo(() => {
    const baseQuery = "https://api.pokemontcg.io/v2/cards";
    const queryParams: Record<string, string> = {
      select: "id,images",
      q: `name:"${name}*"`,
    };

    if (types) {
      queryParams.q += ` AND (${formatTerms(types, "types")})`;
    }

    if (subtypes) {
      queryParams.q += ` AND (${formatTerms(subtypes, "subtypes")})`;
    }

    if (rarities) {
      queryParams.q += ` AND (${formatTerms(rarities, "rarity")})`;
    }

    if (orderBy === "rarity") {
      queryParams.orderBy = `${
        sortDirection === "asc" ? "-" : ""
      }${orderBy.toLowerCase()}`;
    } else {
      queryParams.orderBy = `${
        sortDirection === "desc" ? "-" : ""
      }${orderBy.toLowerCase()}`;
    }

    const queryString = new URLSearchParams(queryParams).toString();

    return decodeURIComponent(`${baseQuery}?${queryString}`).replace(
      /\+/g,
      " "
    );
  }, [name, types, subtypes, rarities, orderBy, sortDirection]);

  // Fetch data if a Pokêmon name if the query parameters change
  useEffect(() => {
    if (!name) {
      return undefined;
    }
    fetchData(url);
  }, [name, url, fetchData]);

  if (!name) {
    return (
      <Alert
        type="info"
        showIcon
        message="Search for a Pokémon to view cards"
        className={styles.alert}
      />
    );
  }

  const renderContent = () => {
    if (isLoading) {
      return <Spin fullscreen size="large" />;
    }

    if (data.length) {
      return (
        <div className={styles.content}>
          <Title className={styles.title} level={5} type="secondary">
            {totalCount} {totalCount === 1 ? "result" : "results"} found
          </Title>
          <div className={styles.cards}>
            {data.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </div>
        </div>
      );
    }

    return <NoResultsFound />;
  };

  return (
    <Layout hasSider>
      <Sider
        width={250}
        collapsible
        collapsedWidth={0}
        theme={isDarkMode ? "dark" : "light"}
        defaultCollapsed={width < MD_SCREEN_BREAKPOINT}
        className={styles.sider}
      >
        <Filter />
      </Sider>

      {renderContent()}
    </Layout>
  );
};

export default Home;
