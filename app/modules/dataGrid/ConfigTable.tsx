import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dataGridsKey } from "~/utils/queryKeys";
import {
  createColumn,
  deleteColumn,
  editColumn,
  getDataGrids,
} from "~/api/handler/dataGrid";

import { DivoButton, notification, TableSkeleton } from "~/components";
import React, {
  createContext,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ColumnsType, ColumnType } from "antd/es/table";
import {
  Checkbox,
  Form,
  FormInstance,
  Input,
  InputRef,
  Table,
  Typography,
} from "antd";
import { IColumn } from "~/types/dataGrid";
import TrashIcon from "../../modules/icons/Trash";
import { FiPlus } from "react-icons/fi";
import styled from "@emotion/styled";
import { isHttpError } from "~/types/global";
import { useParams } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({
  ".addColumn": {
    width: 190,
    display: "flex",
    justifyContent: "space-around",
    marginTop: 10,
  },
}));
export const ConfigTable = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [count, setCount] = useState(2);
  const [dataSource, setDataSource] = useState<IColumn[]>();

  const { Text } = Typography;

  const { mutate: handleUpdateColumn } = useMutation({
    mutationFn: (values: Partial<IColumn>) =>
      editColumn(
        params.projectId as string,
        params.SOWId as string,
        params.scheduleCId as string,
        values.id!,
        { column: values },
      ),
    onSuccess: () => {
      notification.success("Column updated successfully!");
      void queryClient.invalidateQueries([dataGridsKey]);
    },
  });
  const { mutate: handleCreateColumn } = useMutation({
    mutationFn: (values: IColumn) =>
      createColumn(
        params.projectId as string,
        params.SOWId as string,
        params.scheduleCId as string,
        { column: values },
      ),
    onSuccess: () => {
      notification.success("Column created successfully!");
      void queryClient.invalidateQueries([dataGridsKey]);
    },
  });
  const { mutate: handleDeleteColumn } = useMutation({
    mutationFn: (id: string) =>
      deleteColumn(
        params.projectId as string,
        params.SOWId as string,
        params.scheduleCId as string,
        id,
      ),
    onSuccess: () => {
      notification.success("Column deleted successfully!");
      void queryClient.invalidateQueries([dataGridsKey]);
    },
  });
  const {
    data: dataGrids,
    isLoading: isDataGridsLoading,
    isFetching: isDataGridFetching,
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

  useEffect(() => {
    setDataSource(dataGrids?.columns);
  }, [dataGrids]);

  const columns: ColumnsType<IColumn> = [
    {
      title: <Text>Order</Text>,
      dataIndex: "order",
      key: "order",
      width: 120,
      render: (_, { order }) => <div>{order}</div>,
    },
    {
      title: "Column",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (_, { name }) => <div>{name}</div>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      ellipsis: true,
      render: (_, { slug }) => <div>{slug}</div>,
    },
    {
      title: "Formula",
      dataIndex: "formula",
      key: "formula",
      width: "20%",
      ellipsis: true,
      render: (_, { formula }) => <div>{formula}</div>,
    },
    {
      title: "Has cell note?",
      dataIndex: "has_note",
      key: "has_note",
      width: "10%",
      ellipsis: true,
      render: (_, { id, has_note }) => (
        <Checkbox
          defaultChecked={has_note}
          onChange={() => handleUpdateColumn({ id, has_note: !has_note })}
        />
      ),
    },
    {
      title: "Assignable?",
      dataIndex: "is_assignable",
      key: "is_assignable",
      width: "12%",
      ellipsis: true,
      render: (_, { id, is_assignable }) => (
        <Checkbox
          defaultChecked={is_assignable}
          onChange={() =>
            handleUpdateColumn({ id, is_assignable: !is_assignable })
          }
        />
      ),
    },
    {
      title: "Commentable?",
      dataIndex: "is_commentable",
      key: "is_commentable",
      width: "12%",
      ellipsis: true,
      render: (_, { id, is_commentable }) => (
        <Checkbox
          defaultChecked={is_commentable}
          onChange={() =>
            handleUpdateColumn({ id, is_commentable: !is_commentable })
          }
        />
      ),
    },
    {
      title: "Team view",
      dataIndex: "team_view",
      key: "team_view",
      ellipsis: true,
      render: (_, { id, team_view }) => (
        <Checkbox
          defaultChecked={team_view}
          onChange={() => handleUpdateColumn({ id, team_view: !team_view })}
        />
      ),
    },
    {
      title: "Team edit?",
      dataIndex: "team_can_edit",
      key: "team_can_edit",
      ellipsis: true,
      render: (_, { id, team_can_edit }) => (
        <Checkbox
          defaultChecked={team_can_edit}
          onChange={() =>
            handleUpdateColumn({ id, team_can_edit: !team_can_edit })
          }
        />
      ),
    },
    {
      title: "Client view",
      dataIndex: "client_view",
      key: "client_view",
      ellipsis: true,
      render: (_, { id, client_view }) => (
        <Checkbox
          defaultChecked={client_view}
          onChange={() => handleUpdateColumn({ id, client_view: !client_view })}
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => <TrashIcon onClick={() => handleDeleteColumn(id)} />,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IColumn[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
    },
    getCheckboxProps: (record: IColumn) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  {
    const handleAdd = () => {
      const newData: IColumn = {
        name: "-",
        slug: "-",
        formula: "-",
        order: 0,
        has_note: false,
        is_assignable: false,
        is_commentable: false,
        is_modifiable: false,
        team_view: false,
        admin_view: false,
        client_view: false,
        team_can_edit: false,
      };
      handleCreateColumn(newData);
      setDataSource([...dataSource!, newData]);
      setCount(count + 1);
    };
    const EditableContext = createContext<FormInstance<any> | null>(null);

    interface EditableCellProps {
      title: React.ReactNode;
      editable: boolean;
      dataIndex: keyof IColumn;
      record: IColumn;
      handleSave: (record: IColumn) => void;
    }

    const EditableCell = ({
      title,
      editable,
      children,
      dataIndex,
      record,
      handleSave,
      ...restProps
    }: PropsWithChildren<EditableCellProps>) => {
      const [editing, setEditing] = useState(false);
      const inputRef = useRef<InputRef>(null);
      const form = useContext(EditableContext)!;

      useEffect(() => {
        if (editing) {
          inputRef.current?.focus();
        }
      }, [editing]);

      const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
      };

      const save = async () => {
        try {
          const values = await form.validateFields();

          toggleEdit();
          handleSave({ ...record, ...values });
        } catch (errInfo) {
          console.log("Save failed:", errInfo);
        }
      };

      let childNode = children;

      if (editable) {
        childNode = editing ? (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex as string}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        ) : (
          <div
            className="editable-cell-value-wrap"
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        );
      }

      return <td {...restProps}>{childNode}</td>;
    };
    const handleSave = (row: IColumn) => {
      const newData = [...dataSource!];
      const index = newData.findIndex((item) => row.id === item.id);
      const item = newData[index];
      handleUpdateColumn(row);
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDataSource(newData);
    };

    interface EditableRowProps {
      index: number;
    }

    const EditableRow = (props: EditableRowProps) => {
      const [form] = Form.useForm();
      return (
        <Form form={form} component={false}>
          <EditableContext.Provider value={form}>
            <tr
              {...(props as DetailedHTMLProps<
                HTMLAttributes<HTMLTableRowElement>,
                HTMLTableRowElement
              >)}
            />
          </EditableContext.Provider>
        </Form>
      );
    };
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const editableColumns = columns.map(
      (column: ColumnType<IColumn>, index) => {
        if (index > 4) {
          return column;
        }
        return {
          ...column,
          onCell: (record: IColumn) => ({
            record,
            editable: index < 4,
            dataIndex: column.dataIndex,
            title: column.title,
            handleSave,
          }),
        };
      },
    );
    return (
      <StyledWrapper>
        {isDataGridsLoading ? (
          <TableSkeleton />
        ) : (
          <Table
            dataSource={dataSource}
            columns={editableColumns as ColumnsType<IColumn>}
            components={components}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            pagination={false}
            loading={isDataGridFetching && !isDataGridsLoading}
          />
        )}
        <DivoButton
          onClick={handleAdd}
          variant="secondary"
          className="addColumn"
        >
          <FiPlus size={20} />
          Add new column
        </DivoButton>
      </StyledWrapper>
    );
  }
};
