import { gql, useQuery } from "@apollo/client";
import { Avatar, Breadcrumb, Card, Tag } from "antd";
import {
  BookOutlined,
  EllipsisOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const BookDetailComponent = ({
  bid,
  navigateToBooks,
}: {
  bid: string;
  navigateToBooks: () => void;
}) => {
  const { loading, error, data } = useQuery(
    gql`
      query GetBookById($bookId: ObjectId!) {
        book(bookId: $bookId) {
          _id
          title
          description
          year
        }
      }
    `,
    { variables: { bookId: bid } }
  );

  if (error) return <h1>Error fetching data...</h1>;

  return (
    <>
      <div className="mt-4">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item onClick={() => navigateToBooks()}>
            <span className="cursor-pointer">Books</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{data?.book.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-8">
        <Card
          loading={loading}
          style={{ width: 500 }}
          actions={[
            <ShoppingCartOutlined key="setting" />,
            <BookOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <div className="p-4">
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={data?.book.title}
              description={data?.book.description}
            />
          </div>
          <div className="absolute top-2 right-0.5">
            <Tag color="blue">
              <span className="text-lg">Year: {data?.book.year}</span>
            </Tag>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BookDetailComponent;
