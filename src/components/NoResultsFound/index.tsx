import { Result } from "antd";

import pokemonNotFound from "images/pokemonNotFound.png";

import styles from "./index.module.scss";

// Notifies user when there are no results returned from the API
const NoResultsFound = () => {
  return (
    <Result
      icon={<img src={pokemonNotFound} alt="Not Found" width={100} />}
      title="No Pokêmon Found"
      subTitle="Check your spelling or filters and try again."
      className={styles.result}
    />
  );
};

export default NoResultsFound;
