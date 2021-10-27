import { Breadcrumb } from "antd";
import { FunctionComponent } from "react";

interface CustomBreadcrumbProps {
  title?: string;
  navigate?: () => void;
}

const CustomBreadcrumb: FunctionComponent<CustomBreadcrumbProps> = ({
  title,
  navigate,
}) => (
  <Breadcrumb style={{ margin: "16px 0" }}>
    <Breadcrumb.Item onClick={() => navigate && navigate()}>
      <span className="cursor-pointer">Books</span>
    </Breadcrumb.Item>
    {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
  </Breadcrumb>
);

export default CustomBreadcrumb;
