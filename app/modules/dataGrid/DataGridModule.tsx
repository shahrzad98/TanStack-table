import styled from "@emotion/styled";
import { FC } from "react";
import { DataGridHeader } from "~/modules";
import { DataGridTable } from "~/modules";

const WrapperStyled = styled("div")({
  position: "relative",
  userSelect: "none",
  padding: "31px 18px",
  button: {
    marginRight: 20,
    fontSize: 20,
    fontWeight: 500,
    height: 52,
  },
});

type View = "Owner" | "Team" | "Client";
interface ScheduleCModuleProps {
  view?: View | undefined;
}

export const DataGridModule: FC<ScheduleCModuleProps> = ({ view }) => {
  return (
    <WrapperStyled>
      <DataGridHeader view={view} />
      <DataGridTable />
    </WrapperStyled>
  );
};
