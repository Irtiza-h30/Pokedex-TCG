import { useEffect, useMemo } from "react";
import { Alert, Button, Layout, Spin, Typography } from "antd";

import { useColorTheme } from "contexts/ColorThemeContext";

import Card from "components/Card";
import Filter from "components/Filter";
import NoResultsFound from "components/NoResultsFound";

import { MD_SCREEN_BREAKPOINT } from "constants";

import useQueryParams from "hooks/userQueryParams";
import useScreenSize from "hooks/useScreenSize";
import useFetchData from "hooks/useFetchData";

import { PokemonCard } from "interfaces";

import styles from "./index.module.scss";

const { Sider } = Layout;
const { Title } = Typography;

interface ApiResponse {
  count: number;
  data: Array<PokemonCard>;
  totalCount: number;
  page: number;
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

  const { response, isLoading, fetchData, isFetching, loadMoreData } =
    useFetchData<ApiResponse>({
      count: 0,
      data: [],
      totalCount: 0,
      page: 0,
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
      pageSize: "20",
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

    const formattedOrderBy = `${orderBy.toLowerCase()},number`;

    if (orderBy === "rarity") {
      queryParams.orderBy = `${
        sortDirection === "asc" ? "-" : ""
      }${formattedOrderBy}`;
    } else {
      queryParams.orderBy = `${
        sortDirection === "desc" ? "-" : ""
      }${formattedOrderBy}`;
    }

    const queryString = new URLSearchParams(queryParams).toString();

    return decodeURIComponent(`${baseQuery}?${queryString}`).replace(
      /\+/g,
      " "
    );
  }, [name, types, subtypes, rarities, orderBy, sortDirection]);

  // Fetch data if a Pokêmon name if the query parameters change, initializing to page 1
  useEffect(() => {
    if (!name) {
      return undefined;
    }
    fetchData(`${url}&page=1`);
  }, [name, url, fetchData]);

  const onFetchMoreData = () => {
    loadMoreData(`${url}&page=${response.page + 1}`);
  };

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
          {data.length < totalCount && (
            <Button
              className={styles.loadMore}
              loading={isFetching}
              onClick={onFetchMoreData}
            >
              Load More
            </Button>
          )}
        </div>
      );
    }

    return <NoResultsFound />;
  };

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
