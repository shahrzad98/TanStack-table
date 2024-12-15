import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scheduleCPropertiesKey } from "~/utils/queryKeys";
import {
  createScheduleCProperty,
  deleteScheduleCProperty,
  editScheduleCProperty,
  getScheduleCProperties,
} from "~/api/handler/scheduleC";

import { DivoButton, notification, TableSkeleton } from "~/components";
import {
  createContext,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
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
import TrashIcon from "../../modules/icons/Trash";
import { FiPlus } from "react-icons/fi";
import styled from "@emotion/styled";
import { ISchedulesCProperty } from "~/types/scheduleC";
import { isHttpError } from "~/types/global";
import { useParams } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({
  ".addAttribute": {
    width: 190,
    display: "flex",
    justifyContent: "space-around",
    marginTop: 10,
  },
}));
export const AttributeTable = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [count, setCount] = useState(2);
  const [dataSource, setDataSource] = useState<ISchedulesCProperty[]>();

  const { Text } = Typography;

  const { mutate: handleUpdateScheduleCProperty } = useMutation({
    mutationFn: (values: ISchedulesCProperty) =>
      editScheduleCProperty(params.scheduleCId as string, values.id!, {
        schedulec_property: values,
      }),
    onSuccess: () => {
      notification.success("Attribute updated successfully!");
      void queryClient.invalidateQueries([scheduleCPropertiesKey]);
    },
  });
  const { mutate: handleCreateScheduleCProperty } = useMutation({
    mutationFn: (values: ISchedulesCProperty) =>
      createScheduleCProperty(params.scheduleCId as string, {
        schedulec_property: values,
      }),
    onSuccess: () => {
      notification.success("Attribute created successfully!");
      void queryClient.invalidateQueries([scheduleCPropertiesKey]);
    },
  });
  const { mutate: handleDeleteScheduleCProperty } = useMutation({
    mutationFn: (id: string) =>
      deleteScheduleCProperty(params.scheduleCId as string, id),
    onSuccess: () => {
      notification.success("Attribute deleted successfully!");
      void queryClient.invalidateQueries([scheduleCPropertiesKey]);
    },
  });

  const {
    data: scheduleCProperties,
    isLoading: isScheduleCPropertiesLoading,
    isFetching: isScheduleCFetching,
    error: ScheduleCPropertiesError,
  } = useQuery(
    [scheduleCPropertiesKey],
    () =>
      getScheduleCProperties(params.scheduleCId as string).then(
        (res) => res?.data,
      ),
    {
      initialData: queryClient.getQueryData([scheduleCPropertiesKey]),
      enabled: !!params,
    },
  );

  useEffect(() => {
    if (isHttpError(ScheduleCPropertiesError)) {
      notification.error(
        ScheduleCPropertiesError?.message ?? "Something went wrong!",
      );
    }
  }, [ScheduleCPropertiesError]);

  useEffect(() => {
    setDataSource(scheduleCProperties);
  }, [scheduleCProperties]);

  const columns: ColumnsType<ISchedulesCProperty> = [
    {
      title: <Text>Order</Text>,
      dataIndex: "order",
      key: "order",
      width: 120,
      render: (_, { order }) => <div>{order}</div>,
    },
    {
      title: "Attribute",
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
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "20%",
      ellipsis: true,
      render: (_, { value }) => <div>{value}</div>,
    },
    {
      title: "Value Type",
      dataIndex: "value_type",
      key: "value_type",
      width: "20%",
      ellipsis: true,
      render: (_, { value_type }) => <div>{value_type}</div>,
    },

    {
      title: "Team view",
      dataIndex: "team_view",
      key: "team_view",
      ellipsis: true,
      render: (_, { id, team_view }) => (
        <Checkbox
          defaultChecked={team_view}
          onChange={() =>
            handleUpdateScheduleCProperty({ id, team_view: !team_view })
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
          onChange={() =>
            handleUpdateScheduleCProperty({ id, client_view: !client_view })
          }
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => (
        <TrashIcon onClick={() => handleDeleteScheduleCProperty(id)} />
      ),
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ISchedulesCProperty[],
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
    },
    getCheckboxProps: (record: ISchedulesCProperty) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  {
    const handleAdd = () => {
      const newData: ISchedulesCProperty = {
        name: "-",
        slug: "-",
        value: "-",
        value_type: null,
      };
      handleCreateScheduleCProperty(newData);
      setDataSource([...dataSource!, newData]);
      setCount(count + 1);
    };
    const EditableContext = createContext<FormInstance<any> | null>(null);

    interface EditableCellProps {
      title: ReactNode;
      editable: boolean;
      dataIndex: keyof ISchedulesCProperty;
      record: ISchedulesCProperty;
      handleSave: (record: ISchedulesCProperty) => void;
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
            name={dataIndex}
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
    const handleSave = (row: ISchedulesCProperty) => {
      const newData = [...dataSource!];
      const index = newData.findIndex((item) => row.id === item.id);
      const item = newData[index];
      handleUpdateScheduleCProperty(row);
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
      (column: ColumnType<ISchedulesCProperty>, index) => {
        if (index > 4) {
          return column;
        }
        return {
          ...column,
          onCell: (record: ISchedulesCProperty) => ({
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
        {isScheduleCPropertiesLoading ? (
          <TableSkeleton />
        ) : (
          <Table
            dataSource={dataSource}
            columns={editableColumns as ColumnsType<ISchedulesCProperty>}
            components={components}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            pagination={false}
            loading={isScheduleCFetching && !isScheduleCPropertiesLoading}
          />
        )}
        <DivoButton
          onClick={handleAdd}
          variant="secondary"
          className="addAttribute"
        >
          <FiPlus size={20} />
          Add new attribute
        </DivoButton>
      </StyledWrapper>
    );
  }
};
