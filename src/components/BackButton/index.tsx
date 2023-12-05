import { Button, ButtonProps, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";

const { Text } = Typography;

const BackButton = ({ ...props }: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      className={styles.button}
      data-testid="back"
      {...props}
      onClick={() => navigate(-1)}
    >
      <Space size={6}>
        <span className={styles.icon}>
          <LeftOutlined />
        </span>
        <Text>Back</Text>
      </Space>
    </Button>
  );
};

export default BackButton;
