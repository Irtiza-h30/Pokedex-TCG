import { Button, ButtonProps, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";

const { Text } = Typography;

const BackButton = ({ ...props }: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      className={styles.button}
      data-testid="back"
      {...props}
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
