import { Dropdown } from "antd";
import { FC, JSX, PropsWithChildren } from "react";

export const ContextMenu: FC<
  PropsWithChildren<{
    menu: JSX.Element;
  }>
> = ({ children, menu }) => {
  return (
    <Dropdown overlay={menu} trigger={["contextMenu"]}>
      {children}
    </Dropdown>
  );
};
