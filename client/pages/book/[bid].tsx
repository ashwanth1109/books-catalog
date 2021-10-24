import { NextPage } from "next";
import { useRouter } from "next/router";

import BookDetailComponent from "../../components/book-detail.component";
import { Breadcrumb } from "antd";

const Bid: NextPage = () => {
  const router = useRouter();
  const { bid } = router.query;

  if (!bid) {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <span className="cursor-pointer">Books</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <h1>Loading ...</h1>
        </div>
      </>
    );
  }

  return (
    <BookDetailComponent
      bid={bid as string}
      navigateToBooks={() => router.push("/")}
    />
  );
};

export default Bid;
