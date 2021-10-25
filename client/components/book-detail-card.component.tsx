import {
  BookOutlined,
  EllipsisOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tag } from "antd";

const { Meta } = Card;

const BookDetailCard = ({
  loading,
  title,
  description,
  year,
}: {
  loading: boolean;
  title: string;
  description: string;
  year: string;
}) => {
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
          title={title}
          description={description}
        />
      </div>
      <div className="absolute top-2 right-0.5">
        <Tag color="blue">
          <span className="text-lg">Year: {year}</span>
        </Tag>
      </div>
    </Card>
  );
};

export default BookDetailCard;
