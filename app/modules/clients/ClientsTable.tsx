import {
  DivoDropdown,
  DivoModal,
  DivoSelect,
  DivoTable,
  notification,
  TableSkeleton,
} from "~/components";
import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Row, Space, Typography } from "antd";
import { FiCircle } from "react-icons/fi";
import ThreeDotsActive from "../../modules/icons/ThreeDotsActive";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientsKey } from "~/utils/queryKeys";
import { useTheme } from "@emotion/react";
import { deleteClient, getClients, IStatusFilter } from "~/api/handler/client";
import { IClientRequest } from "~/types/client";
import { isHttpError } from "~/types/global";
import { Link, useNavigate } from "@remix-run/react";
import JiraIcon from "../../modules/icons/Jira";
import TogglIcon from "../../modules/icons/Toggl";
import ArrowRight from "../../modules/icons/ArrowRight";

import { Delete, Edit } from "../shared";
import { AddClient } from "./form";
import styled from "@emotion/styled";

const WrapperStyled = styled("div")({
  ".filter": {
    display: "flex",
    justifyContent: "end",
    top: -60,
    position: "relative",
  },
});
export const ClientsTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<Partial<IClientRequest>>();
  const [clientId, setClientId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<IStatusFilter>({
    isActive: "all",
  });
  const { Text } = Typography;
  const queryClient = useQueryClient();

  const {
    data: clients,
    isLoading: isClientsLoading,
    isFetching: isClientsFetching,
    error: clientsError,
  } = useQuery(
    [clientsKey, statusFilter],
    () => getClients(statusFilter).then((res) => res?.data),
    {
      initialData: queryClient.getQueryData([clientsKey]),
    },
  );
  const { mutate: handleDeleteClient, isLoading: isDeleteLoading } =
    useMutation(() => deleteClient(clientId), {
      onSuccess: () => {
        notification.success("Client Successfully Deleted.");
        void queryClient.invalidateQueries([clientsKey]);
      },
      onSettled: () => {
        setDeleteModalOpen(false);
      },
    });

  useEffect(() => {
    if (isHttpError(clientsError)) {
      notification.error(clientsError?.message ?? "Something went wrong!");
    }
  }, [clientsError]);

  const columns: ColumnsType<IClientRequest> = [
    {
      title: <Text className="rowNumber">#</Text>,
      dataIndex: "key",
      key: "#",
      width: 90,
      render: (_, row, index) => (
        <Text className="rowNumber">
          {(index + 1).toString().padStart(2, "0")}
        </Text>
      ),
    },
    {
      title: "Code",
      dataIndex: "avatar",
      key: "avatar",
      width: 150,
      ellipsis: true,

      render: (_, { code, color }) => (
        <Text
          style={{
            color: "#fff",
            backgroundColor: color,
            padding: "3px 16px",
            borderRadius: 4,
          }}
        >
          {code}
        </Text>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (_, { name }) => <div data-cy="table_first_name">{name}</div>,
      ellipsis: true,
    },

    {
      title: "Jira Project",
      width: "13%",
      render: () => (
        <Row>
          <Space direction="horizontal">
            <div>
              <Space direction="vertical" size={"large"}>
                <JiraIcon />
              </Space>
            </div>
            <Link className="linkStyle" to="">
              Jira Project
            </Link>
          </Space>
        </Row>
      ),
      ellipsis: true,
    },
    {
      title: "Toggle Client",
      width: "13%",
      render: () => (
        <Row>
          <Space direction="horizontal">
            <TogglIcon />
            <Link className="linkStyle" to="">
              Toggle Client
            </Link>
          </Space>
        </Row>
      ),
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "status",
      render: (_, { is_active }) => {
        const statusDict: { [key: string]: string } = {
          true: "Active",
          false: "Inactive",
        };

        return (
          <Row align="middle">
            <FiCircle fill={theme.divnotesGreen} size={10} stroke="none" />
            <Text
              type="success"
              color={theme.divnotesGreen}
              className="employeeStatus"
            >
              {statusDict[is_active]}
            </Text>
          </Row>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "action",
      render: (id, data) => {
        return (
          <DivoDropdown
            destroyPopupOnHide
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <Row
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/clients/${clientId}?epics=true`);
                      }}
                    >
                      <ArrowRight />
                      <Text>Epics</Text>
                    </Row>
                  ),
                },
                {
                  key: 2,
                  label: <Edit setEditModalOpen={setEditModalOpen} />,
                },
                {
                  key: 3,
                  label: <Delete setDeleteModalOpen={setDeleteModalOpen} />,
                },
              ],
            }}
          >
            <ThreeDotsActive
              onClick={(e) => {
                e.stopPropagation();
              }}
              onMouseEnter={() => {
                setClientId(id);
                setInitialData(data);
              }}
            />
          </DivoDropdown>
        );
      },
    },
  ];

  return (
    <WrapperStyled>
      <DivoModal
        open={deleteModalOpen}
        DeleteItemName="Client"
        title="Confirm Delete?"
        okText="Confirm Delete"
        onOk={() => handleDeleteClient()}
        cancelText="Cancel"
        onCancel={() => setDeleteModalOpen(false)}
        isDeleteLoading={isDeleteLoading}
      />
      <AddClient
        setOpen={setEditModalOpen}
        open={editModalOpen}
        isEdit
        clientId={clientId}
        initialData={initialData as IClientRequest}
      />

      {isClientsLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="filter">
            <DivoSelect
              options={[
                { value: "all", label: "All" },
                { value: "true", label: "Active" },
                { value: "false", label: "Inactive" },
              ]}
              defaultValue="all"
              onChange={(value) => {
                setStatusFilter({ isActive: value as boolean });
                void queryClient.invalidateQueries([clientsKey]);
              }}
            />
          </div>
          <DivoTable
            data={clients}
            columns={columns}
            isLarge={false}
            hasRowRedirect
            loading={isClientsFetching && !isClientsLoading}
          />
        </>
      )}
    </WrapperStyled>
  );
};
