import { Divider, Typography } from "antd";

import { TYPES, SUBTYPES, RARITIES, ORDER_BY } from "constants";

import OrderBy from "components/OrderBy";

import CheckableTag from "../CheckableTag";

import styles from "./index.module.scss";

const { Title } = Typography;

// Content for sidebar consisting of OrderBy and FilterBy components
const Filter = () => {
  return (
    <div className={styles.container}>
      <Title level={4} type="secondary">
        Order By
      </Title>
      <OrderBy data={ORDER_BY} />
      <Divider />
      <Title level={4} type="secondary">
        Filter By
      </Title>
      <CheckableTag title="Types" data={TYPES} />
      <CheckableTag title="Subtypes" data={SUBTYPES} />
      <CheckableTag title="Rarities" data={RARITIES} />
    </div>
  );
};

export default Filter;
