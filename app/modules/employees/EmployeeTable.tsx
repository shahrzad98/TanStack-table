import {
  DivoDropdown,
  DivoModal,
  DivoTable,
  notification,
  TableSkeleton,
} from "~/components";
import { useEffect, useState } from "react";
import { IEmployeeData } from "~/types/employee";
import { ColumnsType } from "antd/es/table";
import { Avatar, Row, Typography } from "antd";
import { FiCircle, FiUser } from "react-icons/fi";
import ThreeDotsActive from "~/modules/icons/ThreeDotsActive";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee, getEmployees } from "~/api/handler/employees";
import { employeesKey } from "~/utils/queryKeys";
import { useTheme } from "@emotion/react";
import { isHttpError } from "~/types/global";
import { Delete, Edit } from "../shared";
import { AddEmployee } from "./form";

export const EmployeeTable = () => {
  const theme = useTheme();
  const { Text } = Typography;
  const queryClient = useQueryClient();
  const [initialData, setInitialData] = useState<Partial<IEmployeeData>>();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [employeeId, setEmployeeId] = useState("");

  const {
    data: employees,
    error: employeesError,
    isLoading: isEmployeesLoading,
    isFetching: isEmployeesFetching,
  } = useQuery([employeesKey], () => getEmployees().then((res) => res?.data), {
    initialData: queryClient.getQueryData([employeesKey]),
  });

  useEffect(() => {
    if (isHttpError(employeesError)) {
      notification.error(employeesError?.message ?? "Something went wrong!");
    }
  }, [employeesError]);

  const { mutate: handleDeleteEmployee, isLoading: deleteEmployeeLoading } =
    useMutation((id: string) => deleteEmployee(id), {
      onSuccess: () => {
        void queryClient.invalidateQueries([employeesKey]);
        notification.success("Employee Successfully Deleted.");
      },
      onSettled: () => {
        setDeleteModalOpen(false);
      },
    });
  const columns: ColumnsType<IEmployeeData> = [
    {
      title: <Text className="rowNumber">#</Text>,
      dataIndex: "key",
      key: "#",
      width: 50,
      render: (_, row, index) => (
        <Text className="rowNumber">
          {(index + 1).toString().padStart(2, "0")}
        </Text>
      ),
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      width: 80,
      render: () => <Avatar src="" icon={<FiUser />} />,
    },
    {
      title: "Name",
      dataIndex: "user.first_name",
      key: "name",
      render: (_, { user }) => <div>{user.first_name}</div>,
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, { role }) => <div>{role?.name}</div>,
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "user.email",
      key: "email",
      render: (_, { user }) => <div>{user.email}</div>,
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "user.phone_number",
      key: "phoneNumber",
      render: (_, { user }) => <div>{user.phone_number}</div>,
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "8%",
      ellipsis: true,
      render: () => (
        <Row align="middle">
          <FiCircle fill={theme.divnotesGreen} size={10} stroke="none" />
          <Text
            type="success"
            color={theme.divnotesGreen}
            className="employeeStatus"
          >
            {"Active"}
          </Text>
        </Row>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      width: "12%",
      key: "action",
      render: (id, data) => (
        <DivoDropdown
          destroyPopupOnHide
          placement="bottomRight"
          menu={{
            items: [
              {
                key: 1,
                label: <Edit setEditModalOpen={setEditModalOpen} />,
              },
              {
                key: 2,
                label: <Delete setDeleteModalOpen={setDeleteModalOpen} />,
              },
            ],
          }}
        >
          <ThreeDotsActive
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
            }}
            onMouseEnter={() => {
              setEmployeeId(id);
              setInitialData(data);
            }}
          />
        </DivoDropdown>
      ),
    },
  ];

  return (
    <>
      <AddEmployee
        setOpen={setEditModalOpen}
        open={editModalOpen}
        isEdit
        employeeId={employeeId}
        initialData={initialData}
      />

      <DivoModal
        open={deleteModalOpen}
        DeleteItemName="Employee"
        title="Confirm Delete?"
        okText="Confirm Delete"
        cancelText="Cancel"
        onOk={() => handleDeleteEmployee(employeeId)}
        onCancel={() => setDeleteModalOpen(false)}
        isDeleteLoading={deleteEmployeeLoading}
      />
      {isEmployeesLoading ? (
        <TableSkeleton />
      ) : (
        <DivoTable
          data={employees}
          columns={columns}
          loading={isEmployeesFetching && !isEmployeesLoading}
          hasRowRedirect
        />
      )}
    </>
  );
};
