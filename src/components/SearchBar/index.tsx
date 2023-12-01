import { useEffect, useState } from "react";
import { Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import useQueryParams from "hooks/userQueryParams";

import styles from "./index.module.scss";

const { Search } = Input;

interface SearchBarProps {
  className?: string;
}

// Search bar used to query Pokémon cards
const SearchBar = ({ className }: SearchBarProps) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { name } = useQueryParams();

  const [inputValue, setInputValue] = useState<string>("");

  // Set the initial value based on the name in the URL query
  useEffect(() => {
    if (name) {
      setInputValue(name);
    }
  }, [name]);

  // Upon searching, update the name in the URL query, and navigate to the landing page
  const onSearch = (search: string) => {
    queryParams.set("name", search.trim());
    navigate({
      pathname: "/",
      search: queryParams.toString(),
    });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <Search
      placeholder="Search for Pokémon..."
      size="large"
      className={`${styles.search} ${className}`}
      onChange={onChangeInput}
      onSearch={onSearch}
      value={inputValue}
      allowClear
    />
  );
};

export default SearchBar;
