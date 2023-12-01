import { ConfigProvider, theme } from "antd";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import Home from "containers/Home";
import Details from "containers/Details";
import Layout from "components/Layout";

import { useColorTheme } from "contexts/ColorThemeContext";

const { defaultAlgorithm, darkAlgorithm } = theme;

const App = () => {
  const { isDarkMode } = useColorTheme();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ee1515",
          borderRadius: 8,
        },
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Details />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
