import { Link } from "react-router-dom";

import ThemeToggle from "components/ThemeToggle";
import SearchBar from "components/SearchBar";

import pokeball from "images/pokeball.png";

import styles from "./index.module.scss";

// Main header of application, consisting of Logo that routes user to home page, a Theme Toggle that switches between light/dark mode, and a Search input used to query Pokémon cards
const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.link}>
        <span className={styles.title}>
          <img src={pokeball} alt="Pokéball" />
          <h1>Pokédex TCG</h1>
        </span>
      </Link>
      <ThemeToggle />
      <SearchBar className={styles.searchBar} />
    </div>
  );
};

export default Header;
