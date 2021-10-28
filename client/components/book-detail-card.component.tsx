import {
  BookOutlined,
  EllipsisOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tag } from "antd";
import { FunctionComponent, useContext, useEffect, useState } from "react";

import { AppContext } from "state";
import { Book } from "state/books.state";

const { Meta } = Card;

interface BookDetailCardProps {
  loading: boolean;
}

const BookDetailCard: FunctionComponent<BookDetailCardProps> = ({
  loading,
}) => {
  const [book, setBook] = useState<Book | null>();
  const { booksState } = useContext(AppContext);

  useEffect(() => {
    const bookSubscription = booksState.current.subscribe((item) => {
      setBook(item);
    });

    return () => bookSubscription.unsubscribe();
  }, [booksState]);

  return (
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
          title={book?.title}
          description={book?.description}
        />
      </div>
      <div className="absolute top-2 right-0.5">
        <Tag color="blue">
          <span className="text-lg">Year: {book?.year}</span>
        </Tag>
      </div>
    </Card>
  );
};

export default BookDetailCard;
