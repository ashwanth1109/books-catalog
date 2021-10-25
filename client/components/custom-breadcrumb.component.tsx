import { Breadcrumb } from "antd";

const CustomBreadcrumb = ({
  title,
  navigate,
}: {
  title?: string;
  navigate?: () => void;
}) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item onClick={() => navigate && navigate()}>
        <span className="cursor-pointer">Books</span>
      </Breadcrumb.Item>
      {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
