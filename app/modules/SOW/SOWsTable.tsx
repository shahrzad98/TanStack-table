import {
  DivoDropdown,
  DivoModal,
  DivoTable,
  notification,
  TableSkeleton,
} from "~/components";
import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Row, Typography } from "antd";
import { FiCircle } from "react-icons/fi";
import ThreeDotsActive from "../../modules/icons/ThreeDotsActive";
import GoogleDriveIcon from "../../modules/icons/GoogleDrive";
import TogglIcon from "../../modules/icons/Toggl";
import JiraIcon from "../../modules/icons/Jira";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SOWsKey } from "~/utils/queryKeys";
import { useTheme } from "@emotion/react";
import { deleteSOW, getSOWs } from "~/api/handler/SOW";
import { ISOWRequest, ISOWResponse } from "~/types/SOW";
import { isHttpError } from "~/types/global";

import { Delete, Edit } from "../shared";
import { AddSOW } from "./form";
import styled from "@emotion/styled";
import { capitalize } from "~/utils/capitalize";
import dayjs from "dayjs";
import { useParams } from "@remix-run/react";

const WrapperStyled = styled("div")(() => ({}));
export const SOWsTable = () => {
  const theme = useTheme();
  const params = useParams();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<ISOWRequest>();
  const [SOWId, setSOWId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { Text } = Typography;
  const queryClient = useQueryClient();

  const {
    data: SOWs,
    isLoading: isSOWsLoading,
    isFetching: isSOWFetching,
    error: SOWsError,
  } = useQuery([SOWsKey], () => getSOWs(params.projectId as string), {
    initialData: queryClient.getQueryData([SOWsKey]),
    select: (data) => data.data,
  });
  const { mutate: handleDeleteSOW, isLoading: isDeleteLoading } = useMutation(
    () => deleteSOW(params.projectId as string, SOWId),
    {
      onSuccess: () => {
        notification.success("Client Successfully Deleted.");
        void queryClient.invalidateQueries([SOWsKey]);
      },
      onSettled: () => {
        setDeleteModalOpen(false);
      },
    },
  );

  useEffect(() => {
    if (isHttpError(SOWsError)) {
      notification.error(SOWsError?.message ?? "Something went wrong!");
    }
  }, [SOWsError]);

  const columns: ColumnsType<ISOWResponse> = [
    {
      title: "Type",
      dataIndex: "kind",
      key: "kind",
      width: "10%",
      ellipsis: true,
      render: (_, { kind }) => <div>{kind}</div>,
    },
    {
      title: "name",
      dataIndex: "phase_title",
      key: "phase_title",
      width: "20%",
      ellipsis: true,
      render: (_, { phase_title }) => <div>{phase_title}</div>,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      width: "10%",
      ellipsis: true,
      render: (_, { start_date }) => (
        <div>{dayjs(start_date).format("YYYY/MM/DD")}</div>
      ),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      width: "10%",
      ellipsis: true,
      render: (_, { end_date }) => (
        <div>{dayjs(end_date).format("YYYY/MM/DD")}</div>
      ),
    },
    {
      title: "Sch. B",
      dataIndex: "",
      key: "",
      width: "8%",
      render: () => <GoogleDriveIcon />,
    },
    {
      title: "T. Proj.",
      dataIndex: "",
      key: "",
      width: "8%",
      render: () => <TogglIcon />,
    },
    {
      title: "J. Ver.",
      dataIndex: "",
      key: "",
      width: "8%",
      render: () => <JiraIcon />,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      key: "status",
      render: (_, { status }) => {
        const colors: { [key: string]: string } = {
          draft: theme.lightGray,
          approved: theme.divnotesGreen,
          client_review: theme.alert,
          rejected: theme.error,
          completed: theme.divnotesPurple,
        };
        return (
          <Row align="middle">
            <FiCircle fill={colors[status]} size={10} stroke="none" />
            <Text className="employeeStatus">{capitalize(status)}</Text>
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
              onClick={(e) => {
                e.stopPropagation();
              }}
              onMouseEnter={() => {
                setSOWId(id);
                setInitialData(data as ISOWRequest);
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
        DeleteItemName="SOW"
        title="Confirm Delete?"
        okText="Confirm Delete"
        onOk={() => handleDeleteSOW()}
        cancelText="Cancel"
        onCancel={() => setDeleteModalOpen(false)}
        isDeleteLoading={isDeleteLoading}
      />
      <AddSOW
        setOpen={setEditModalOpen}
        open={editModalOpen}
        isEdit
        SOWId={SOWId}
        initialData={initialData}
      />

      {isSOWsLoading ? (
        <TableSkeleton />
      ) : (
        <DivoTable
          data={SOWs}
          columns={columns}
          isLarge={false}
          hasRowRedirect
          loading={isSOWFetching && !isSOWsLoading}
        />
      )}
    </WrapperStyled>
  );
};
