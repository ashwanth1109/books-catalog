import { useCallback, useState } from "react";
import { Layout, Menu } from "antd";
import { FileOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }: any): any => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = useCallback((newState: boolean) => {
    setCollapsed(newState);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<FileOutlined />}>
            Books
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
