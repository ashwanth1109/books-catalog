import { useCallback, useState } from "react";
import { Layout, Menu } from "antd";
import { FileOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

const MainLayout = ({ children }: any): any => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = useCallback((newState: boolean) => {
    setCollapsed(newState);
  }, []);

  return (
    <Layout className="min-h-screen">
      <Sider
        className="min-h-screen"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="w-full h-24" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<FileOutlined />}>
            Books
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <div className="w-full h-16 bg-white" />
        <Content className="mx-8">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
