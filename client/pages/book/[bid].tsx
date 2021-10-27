import { NextPage } from "next";
import { useRouter } from "next/router";

import BookDetailComponent from "../../components/book-detail.component";
import CustomBreadcrumb from "../../components/custom-breadcrumb.component";
import Loading from "../../components/loading.component";

const Bid: NextPage = () => {
  const router = useRouter();
  const { bid } = router.query;

  if (!bid) {
    return (
      <>
        <CustomBreadcrumb />
        <Loading />
      </>
    );
  }

  return <BookDetailComponent bookId={bid as string} />;
};

export default Bid;
