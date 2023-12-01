import { Dropdown, Typography } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

import useQueryParams from "hooks/userQueryParams";

import styles from "./index.module.scss";

const { Text } = Typography;

interface SortByProps {
  className?: string;
  data: Record<string, string>;
}

// Display the different Sort By options in the sidebar
const SortBy = ({ data }: SortByProps) => {
  const [, setSearchParams] = useSearchParams();
  const { orderBy = "name" } = useQueryParams();
  const { sortDirection = "asc" } = useQueryParams();

  // On changing the Order By value, set the updated value in the URL search
  const onChangeSortValue = (i: string) => {
    setSearchParams((prev) => {
      prev.set("orderBy", i);
      return prev;
    });
  };

  // On changing the Sort Direction value (asc/desc), set the updated value in the URL search
  const onChangeSortDirection = () => {
    const sort = sortDirection === "desc" ? "asc" : "desc";
    setSearchParams((prev) => {
      prev.set("sortDirection", sort);
      return prev;
    });
  };

  const items = Object.keys(data).map((i) => ({
    name: i,
    label: data[i],
    key: i,
    onClick: () => onChangeSortValue(i),
  }));

  return (
    <Dropdown
      menu={{
        items,
      }}
      className={styles.sort}
    >
      <div>
        <Text className={styles.highlight} onClick={onChangeSortDirection}>
          {sortDirection === "desc" ? (
            <CaretDownOutlined />
          ) : (
            <CaretUpOutlined />
          )}
          {`${data[orderBy]} (${sortDirection})`}
        </Text>
      </div>
    </Dropdown>
  );
};

export default SortBy;
