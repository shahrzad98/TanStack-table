import {
  DivoButton,
  DivoModal,
  notification,
  TableSkeleton,
} from "~/components";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  TdHTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ColumnsType } from "antd/es/table";
import {
  Button,
  Form,
  GetRef,
  Input,
  InputRef,
  Row,
  Table,
  Typography,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { epicsKey } from "~/utils/queryKeys";
import { isHttpError } from "~/types/global";
import JiraEpic from "../../modules/icons/JiraEpic";
import JiraLocalEpic from "../../modules/icons/JiraLocalEpic";
import JiraArrow from "../../modules/icons/JiraArrow";
import Pencil from "../../modules/icons/PenIcon";
import Trash from "../../modules/icons/Trash";
import styled, { StyledComponent } from "@emotion/styled";
import { createEpic, deleteEpic, editEpic, getEpics } from "~/api/handler/epic";

import { IEpic } from "~/types/epic";
import { FiPlus } from "react-icons/fi";
import { useParams } from "@remix-run/react";

const WrapperStyled: StyledComponent<HTMLAttributes<HTMLDivElement>> = styled(
  "div",
)(() => ({
  paddingBottom: 50,
  ".epicTitle": {
    alignItems: "center",
    justifyContent: "space-between",
    svg: {
      marginRight: 10,
    },
  },

  ".addLocalEpic": {
    width: 159,
    display: "flex",
    justifyContent: "space-around",
    margin: "16px auto ",
  },

  "&& .ant-btn:hover": {
    background: "transparent",
    borderColor: "none",
  },
  "&& .ant-table-cell": { padding: "4px 10px " },
}));

interface IEpicsTableProps {
  isLocal?: boolean;
}

export const EpicsTable = ({ isLocal }: IEpicsTableProps) => {
  const params = useParams();
  const clientId = params.clientId;
  const [epicId, setEpicId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { Text } = Typography;
  const queryClient = useQueryClient();

  const {
    data: epics,
    isLoading: isEpicsLoading,
    error: epicsError,
  } = useQuery([epicsKey, clientId], () => getEpics(clientId as string), {
    select: (data) => data.data,
  });

  const { mutate: handleDeleteEpic, isLoading: isDeleteLoading } = useMutation(
    () => deleteEpic(clientId as string, epicId),
    {
      onSuccess: () => {
        notification.success("Epic Successfully Deleted.");
        void queryClient.invalidateQueries([epicsKey]);
      },
      onSettled: () => {
        setDeleteModalOpen(false);
      },
    },
  );

  const { mutate: handleCreateEpic } = useMutation(
    (values: Partial<IEpic>) =>
      createEpic(clientId as string, {
        epic: values,
      }),
    {
      onSuccess: () => {
        notification.success("Epic Successfully Created.");
        void queryClient.invalidateQueries([epicsKey]);
      },
    },
  );
  const { mutate: handleUpdateEpic } = useMutation(
    (values: Partial<IEpic>) =>
      editEpic(clientId as string, values?.id as string, {
        epic: { ...values, is_local: true },
      }),
    {
      onSuccess: () => {
        notification.success("Epic Successfully Updated.");
        void queryClient.invalidateQueries([epicsKey]);
      },
    },
  );

  const handleAdd = () => {
    const newData: Partial<IEpic> = {
      title: "-",
      key: "-",
      color: "-",
      description: "-",
    };
    handleCreateEpic(newData);
  };

  const handleSave = (row: IEpic) => {
    handleUpdateEpic(row);
  };

  useEffect(() => {
    if (isHttpError(epicsError)) {
      notification.error(epicsError?.message ?? "Something went wrong!");
    }
  }, [epicsError]);

  const columns: ColumnsType<IEpic> = [
    {
      title: <Text className="rowNumber">#</Text>,
      dataIndex: "key",
      key: "#",
      width: 50,
      render: (_, row, index) => (
        <Text className="rowNumber">{(index + 1).toString()}</Text>
      ),
    },
    {
      title: "Epic",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ellipsis: true,

      render: (_, { title }) => (
        <Row className="epicTitle">
          <Row>
            {isLocal ? <JiraLocalEpic /> : <JiraEpic />}
            <Text>{title}</Text>
          </Row>
          <JiraArrow />
        </Row>
      ),
    },
    {
      title: "Display As",
      dataIndex: "display_name",
      key: "display_name",
      width: "20%",
      render: (_, { display_name }) => (
        <Row justify="space-between">
          {display_name ?? "-"}
          <Pencil />
        </Row>
      ),
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
      render: (_, { description }) => (
        <Row justify="space-between">
          {description ?? "-"}
          <Pencil />
        </Row>
      ),
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "id",
      render: (id, info) => {
        return (
          <Button type="text" disabled={!info?.is_local}>
            <Trash
              onClick={() => {
                setDeleteModalOpen(true);
                setEpicId(id);
              }}
            />
          </Button>
        );
      },
    },
  ];

  type FormInstance<T> = GetRef<typeof Form<T>>;
  const EditableContext = React.createContext<FormInstance<any> | null>(null);

  interface EditableRowProps {
    index: number;
  }

  const EditableRow: React.FC<EditableRowProps> = (props) => {
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

  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof IEpic;
    record: IEpic;
    handleSave: (record: IEpic) => void;
  }

  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
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
        handleSave({
          ...record,
          title: values.Epic,
          description: values.Description,
          display_name: values["Display As"],
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
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

    return (
      <td
        {...(restProps as DetailedHTMLProps<
          TdHTMLAttributes<HTMLTableDataCellElement>,
          HTMLTableDataCellElement
        >)}
      >
        {childNode}
      </td>
    );
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const editableColumns = columns.map((col, index) => {
    return {
      ...col,
      onCell: (record: IEpic) => ({
        record,
        editable: index < 4 && index > 0,
        dataIndex: col.title!,
        title: col.title!,
        handleSave,
      }),
    };
  });

  return (
    <WrapperStyled key={Math.random()}>
      <DivoModal
        open={deleteModalOpen}
        DeleteItemName="Epic"
        title="Confirm Delete?"
        okText="Confirm Delete"
        onOk={() => handleDeleteEpic()}
        cancelText="Cancel"
        onCancel={() => setDeleteModalOpen(false)}
        isDeleteLoading={isDeleteLoading}
      />

      {isEpicsLoading ? (
        <TableSkeleton />
      ) : (
        <Table
          dataSource={
            isLocal
              ? (epics?.filter((epic) => epic.is_local) as IEpic[])
              : (epics as IEpic[])
          }
          columns={editableColumns as ColumnsType<IEpic>}
          pagination={false}
          components={components}
        />
      )}
      {isLocal && (
        <DivoButton
          className="addLocalEpic"
          variant="secondary"
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          <FiPlus size={20} />
          Add Local Epic
        </DivoButton>
      )}
    </WrapperStyled>
  );
};
