import type { NextPage } from "next";
import { Breadcrumb } from "antd";

import MainLayout from "../layout/main.layout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Books</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-8">List of books goes here.</div>
    </MainLayout>
  );
};

export default Home;
