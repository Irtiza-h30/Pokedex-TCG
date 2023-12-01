import { ReactNode } from "react";
import { Layout as AntdLayout } from "antd";

import styles from "./index.module.scss";
import Header from "components/Header";

const { Content } = AntdLayout;

interface LayoutProps {
  children: ReactNode;
}

// Layout for app
const Layout = ({ children }: LayoutProps) => {
  return (
    <AntdLayout>
      <Header />
      <Content className={styles.content}>{children}</Content>
    </AntdLayout>
  );
};

export default Layout;
