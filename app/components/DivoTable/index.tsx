import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styled, { StyledComponent } from "@emotion/styled";
import { useLocation, useNavigate } from "@remix-run/react";

const StyledTable: StyledComponent<IEmployeeTable> = styled(Table)(
  ({ theme, isLarge = true }) => ({
    userSelect: "none",
    ".ant-table": {
      color: theme.secondary,
      table: {
        borderSpacing: "0 10px",
      },
    },
    ".ant-table-content": {
      backgroundColor: theme.pristine,
    },
    ".ant-table-row .ant-table-cell": {
      paddingLeft: 20,
      paddingRight: 0,
    },
    "thead th.ant-table-cell": {
      color: theme.secondary,
      padding: "0 20px",
      background: theme.pristine,
      fontWeight: 400,
      ":before": {
        display: "none",
      },
    },
    ".linkStyle": {
      borderBottom: `1px solid ${theme.primary}`,
    },
    ".ant-table-tbody": {
      tr: {
        background: theme.white,
        td: {
          height: isLarge ? 64 : 40,
          padding: isLarge ? "10px 32px" : "0 32px",
          fontWeight: 500,
        },
      },
      "td:first-of-type": {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      },
      "td:last-child": {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      },
    },
    ".employeeStatus": {
      marginLeft: 10,
    },
    ".rowNumber": {
      fontWeight: 300,
    },
  }),
);

interface IEmployeeTable extends TableProps {
  data?: Array<any>;
  columns: ColumnsType<any>;
  hasRowRedirect?: boolean;
  isLarge?: boolean;
}

export const DivoTable = ({
  data,
  columns,
  hasRowRedirect = false,
  ...props
}: IEmployeeTable) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={
        hasRowRedirect
          ? (record) => {
              return {
                onClick: () =>
                  navigate(
                    decodeURIComponent(`${location.pathname}/${record.id}`),
                  ),
              };
            }
          : undefined
      }
      {...props}
    />
  );
};
