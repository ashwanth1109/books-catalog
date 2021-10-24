import type { NextPage } from "next";

import "../styles/Home.module.css";
import MainLayout from "../layout/main.layout";
import { Breadcrumb } from "antd";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Books</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, minHeight: 360 }}>
        List of books goes here.
      </div>
    </MainLayout>
  );
};

export default Home;
