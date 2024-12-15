import React, {
  HTMLProps,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Table as MantineTable } from "@mantine/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "@emotion/styled";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Menu, Row as AntdRow, Table } from "antd";
import {
  ActionCell,
  ContextMenu,
  DraggableRow,
  Editor,
  notification,
  TableSkeleton,
} from "~/components";
import { ResizableWrapper } from "~/components/ScheduleC/ResizableWrapper";
import { CustomCell } from "~/components/ScheduleC/Table/CustomCell";
import { theme } from "~/styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dataGridsKey } from "~/utils/queryKeys";

import { getDataGrids } from "~/api/handler/dataGrid";
import { isHttpError } from "~/types/global";
import { IRow } from "~/types/dataGrid";
import { ColumnDef } from "@tanstack/table-core";
import { useParams } from "@remix-run/react";

const WrapperStyled = styled("div")({
  "&& .datagridTable": {
    backgroundColor: "transparent",
    tbody: {
      backgroundColor: "#fff",
    },
  },
  height: "70vh",
  overflow: "auto",
  ".settingTitle": {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: -30,
    left: "40%",
    p: {
      margin: "12px 0",
      fontSize: 12,
      fontWeight: 400,
    },
  },

  ".mantine-Table-root": {
    backgroundColor: "#fff",
  },
  ".addNoteIcon": {
    color: theme.successColor,
  },
  ".mantine-Table-td  ,.mantine-Table-th": {
    minWidth: 100,
  },
  ".featureCell": {
    width: "100%",
    paddingLeft: 20,
  },
});

const TableStyled = styled(MantineTable)({
  "&& thead": {
    "tr:nth-child(2)": {
      backgroundColor: "#DEE2E9",
      border: "2px solid rgba(38, 132, 255, 1)",
      height: 40,
    },
    ".tableRow": {
      backgroundColor: "#F3F8FC",
      textAlign: "center",
    },
  },
  "tr:first-child th": {
    border: "none",
    color: "#2B323A",
    fontWeight: 400,
    padding: 0,
    textAlign: "center",
  },
  ".cell": {
    padding: 0,
    height: 40,
  },
  "thead tr:nth-child(2)": {
    // borderTop: "2px solid rgba(38, 132, 255, 1)",
  },
  "thead tr:nth-child(1)": {
    backgroundColor: "#F3F8FC",
  },
  "thead tr:nth-child(2) th": {
    // border: "1px solid #fff;",
  },
  th: {
    textAlign: "center",
  },
  ".actions": { width: 30 },
  ".noteIcon": {
    cursor: "pointer",
    textAlign: "center",
  },

  "& .resizer": {
    width: 2,
    backgroundColor: "rgba(68, 174, 251, 1)",
    position: "absolute",
    opacity: 0,
    top: 0,
    right: 0,
    cursor: `url(/cursor.svg) 24 24, auto`,
    touchAction: "none",
    "& .isResizing": {
      backgroundColor: theme.primaryColor,
      opacity: 1,
    },
    "&:hover": { opacity: 1 },
  },
  "& .editableCell": {
    padding: 0,
    paddingLeft: 5,
    boxShadow: "none",
    border: "none",
    backgroundColor: "transparent",
  },
});

export const DataGridTable = memo(() => {
  const [editorVisible, setEditorVisible] = useState(false);
  const [resizerHeight, setResizerHeight] = useState(0);

  const [newArrayOfRows, setNewArrayOfRows] = useState<
    IRow[] & { subRows: IRow[] }[]
  >([]);

  const [data, setData] = useState<IRow[]>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const params = useParams();
  const queryClient = useQueryClient();
  const {
    data: dataGrids,
    isLoading: isDataGridsLoading,
    error: dataGridsError,
  } = useQuery(
    [dataGridsKey],
    () =>
      getDataGrids(
        params.projectId as string,
        params.SOWId as string,
        params.scheduleCId as string,
      ).then((res) => res?.data),
    {
      initialData: queryClient.getQueryData([dataGridsKey]),
      enabled: !!params,
    },
  );
  useEffect(() => {
    if (isHttpError(dataGridsError)) {
      notification.error(dataGridsError?.message ?? "Something went wrong!");
    }
  }, [dataGridsError]);

  const addRow = () => {};
  const deleteRow = () => {};

  const dynamicColumns: ColumnDef<IRow & { subRows?: IRow[] }>[] =
    dataGrids?.columns
      ? dataGrids?.columns?.map((column, index) => {
          return {
            id: (index + 3).toString(),
            size: 100,
            accessorFn: (row) => row,
            cell: (info) => {
              return (
                <CustomCell
                  defaultValue={
                    dataGrids?.cells?.find(
                      (C) =>
                        C.row_id === info?.row?.id &&
                        C.column_id === column?.id,
                    )?.value
                  }
                  type="dynamicCell"
                  cellData={{
                    row_id: info?.row?.id,
                    column_id: column?.id,
                  }}
                  isParent={!info?.row?.original?.parent_id}
                  setEditorVisible={setEditorVisible}
                  {...info}
                  {...column}
                />
              );
            },
            header: () => {
              return (
                <div className="settingTitle">
                  <p>{column.name}</p>
                  <span>{column.value}</span>
                </div>
              );
            },
          };
        })
      : [];

  const columns: ColumnDef<IRow & { subRows?: IRow[] }>[] = useMemo(
    () => [
      {
        id: "1",
        accessorKey: "title",
        accessorFn: (row) => row,
        size: 370,
        header: ({ table }) => {
          return (
            <AntdRow justify="start">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
              {"Feature"}
            </AntdRow>
          );
        },
        cell: (info) => {
          return (
            <AntdRow
              justify="space-between"
              style={{
                paddingLeft: `${info.row.depth}rem`,
              }}
            >
              <AntdRow
                align="middle"
                justify="space-between"
                className="featureCell"
              >
                <AntdRow>
                  <IndeterminateCheckbox
                    {...{
                      checked: info.row.getIsSelected(),
                      indeterminate: info.row.getIsSomeSelected(),
                      onChange: info.row.getToggleSelectedHandler(),
                    }}
                  />
                  <CustomCell type="feature" {...info} />
                </AntdRow>
                <AntdRow>
                  <div className="actions ">
                    <ActionCell
                      addRow={addRow}
                      deleteRow={deleteRow}
                      {...info}
                    />
                  </div>
                  <div className="actions">
                    {info.row.getCanExpand() ? (
                      info.row.getIsExpanded() ? (
                        <IconChevronUp
                          color={theme.primaryColor}
                          size={15}
                          onClick={info.row.getToggleExpandedHandler()}
                        />
                      ) : (
                        <IconChevronDown
                          color={theme.primaryColor}
                          size={15}
                          onClick={info.row.getToggleExpandedHandler()}
                        />
                      )
                    ) : null}
                  </div>
                </AntdRow>
              </AntdRow>
            </AntdRow>
          );
        },
      },
      {
        accessorKey: "epic",
        id: "2",
        size: 70,
        cell: (info) => <CustomCell type="epic" {...info} />,
        header: () => <span>Epic</span>,
      },
    ],
    [],
  );

  useEffect(() => {
    dataGrids?.rows &&
      setNewArrayOfRows(dataGrids?.rows?.map((el) => ({ ...el, subRows: [] })));
  }, [dataGrids?.rows]);

  if (newArrayOfRows)
    for (const item of newArrayOfRows) {
      for (const element of newArrayOfRows) {
        if (item.parent_id === element.id) {
          !element.subRows.find((S) => S.id == item.id) &&
            element.subRows.push(item);
        }
      }
    }

  useEffect(() => {
    setData(newArrayOfRows?.filter((el) => !el.parent_id));
  }, [newArrayOfRows]);

  const noteColumn: ColumnDef<IRow & { subRows?: IRow[] }> = {
    id: dataGrids ? (dataGrids.columns.length + 3).toString() : "",
    accessorFn: (row) => row,
    header: "Notes",
    columns: [
      {
        accessorFn: (row) => row,
        id: dataGrids ? (dataGrids?.columns?.length + 3).toString() : "",
        cell: (info) => (
          <CustomCell
            type="note"
            setEditorVisible={setEditorVisible}
            {...info}
          />
        ),
      },
    ],
  };

  const table = useReactTable<IRow & { subRows?: IRow[] }>({
    data,
    columns: [...columns, ...dynamicColumns, noteColumn],
    state: {
      expanded,
    },
    defaultColumn: {
      size: 102,
    },
    columnResizeMode: "onChange",
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getRowId: (row) => row.id, //good to have guaranteed unique row ids/keys for rendering
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    if (tableRef.current) {
      setResizerHeight(tableRef.current.clientHeight);
    }
  }, []);
  const contextMenuItems = (
    <Menu>
      <Menu.Item key="1" onClick={() => table.reset()}>
        Reset column size{" "}
      </Menu.Item>
    </Menu>
  );

  return (
    <ContextMenu menu={contextMenuItems}>
      <DndProvider backend={HTML5Backend}>
        <WrapperStyled>
          {isDataGridsLoading ? (
            <TableSkeleton />
          ) : dataGrids?.rows?.length ? (
            <TableStyled
              w={table.getTotalSize()}
              ref={tableRef}
              className="datagridTable"
            >
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="tableRow">
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{
                            width: header.getSize(),
                            position: "relative",
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              <div
                                className={`resizer ${
                                  header.column.getIsResizing()
                                    ? "isResizing "
                                    : ""
                                }`}
                                style={{
                                  height: resizerHeight,
                                }}
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                              />
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              {table && (
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow
                      selectedRows={table.getFilteredSelectedRowModel().rows}
                      key={row.id}
                      row={row}
                      data={data}
                      setData={setData}
                    />
                  ))}
                </tbody>
              )}
            </TableStyled>
          ) : (
            <Table dataSource={[]} columns={[]} />
          )}
          {editorVisible && (
            <ResizableWrapper>
              <Editor setEditorVisible={setEditorVisible} />
            </ResizableWrapper>
          )}
        </WrapperStyled>
      </DndProvider>
    </ContextMenu>
  );
});

DataGridTable.displayName = "DataGridTable";

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + "cursor-pointer"}
      {...rest}
    />
  );
}
