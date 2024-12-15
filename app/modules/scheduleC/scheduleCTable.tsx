import {
  DivoModal,
  DivoTable,
  notification,
  TableSkeleton,
} from "~/components";
import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Row, Typography } from "antd";
import { FiCircle } from "react-icons/fi";
import GoogleDrive from "../../modules/icons/GoogleDrive";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scheduleCsKey } from "~/utils/queryKeys";
import { useTheme } from "@emotion/react";
import {
  createScheduleC,
  deleteScheduleC,
  getScheduleCs,
} from "~/api/handler/scheduleC";
import { IScheduleCResponse } from "~/types/scheduleC";
import { isHttpError } from "~/types/global";
import PenIcon from "../../modules/icons/PenIcon";
import SettingIcon from "../../modules/icons/Setting";
import CopyIcon from "../../modules/icons/Copy";
import TrashIcon from "../../modules/icons/Trash";
import { AddScheduleC } from "./form";
import styled from "@emotion/styled";

import dayjs from "dayjs";
import { capitalize } from "~/utils/capitalize";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";

const WrapperStyled = styled("div")(({ theme }) => ({
  ".scheduleBWrapper": {
    justifyContent: "end",
  },
  ".scheduleB": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: -60,
    position: "relative",
    width: 150,
    height: 40,
    backgroundColor: theme.white,
    borderRadius: 8,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
    svg: {
      marginRight: 10,
    },
  },
  ".actions": {
    width: 128,
    justifyContent: "space-around",
    alignItems: "center",
    svg: {
      cursor: "pointer",
    },
  },
}));
export const ScheduleCTable = () => {
  const theme = useTheme();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [_] = useSearchParams();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [scheduleCId, setScheduleCId] = useState("");
  const [scheduleCName, setScheduleCName] = useState("");

  const { Text } = Typography;
  const queryClient = useQueryClient();

  const {
    data: scheduleCs,
    isLoading: isScheduleCsLoading,
    isFetching: isScheduleCFetching,
    error: scheduleCsError,
  } = useQuery(
    [scheduleCsKey],
    () =>
      getScheduleCs(params.projectId as string, params.SOWId as string).then(
        (res) => res?.data,
      ),
    {
      initialData: queryClient.getQueryData([scheduleCsKey]),
      enabled: !!location,
    },
  );

  const { mutate: handleCreateScheduleC } = useMutation({
    mutationFn: () =>
      createScheduleC(params.projectId as string, params.SOWId as string, {
        name: `${scheduleCName}[COPY]`,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries([scheduleCsKey]);
      notification.success("ScheduleC created successfully!");
    },
  });
  const { mutate: handleDeleteScheduleC, isLoading: isDeleteLoading } =
    useMutation(
      (_: React.MouseEvent<HTMLButtonElement>) =>
        deleteScheduleC(
          params.projectId as string,
          params.SOWId as string,
          scheduleCId,
        ),
      {
        onSuccess: () => {
          notification.success("ScheduleC Successfully Deleted.");
          void queryClient.invalidateQueries([scheduleCsKey]);
        },
        onSettled: () => {
          setDeleteModalOpen(false);
        },
      },
    );

  useEffect(() => {
    if (isHttpError(scheduleCsError)) {
      notification.error(scheduleCsError?.message ?? "Something went wrong!");
    }
  }, [scheduleCsError]);

  const columns: ColumnsType<IScheduleCResponse> = [
    {
      title: <Text className="rowNumber">#</Text>,
      dataIndex: "key",
      key: "#",
      width: 120,
      render: (_, row, index) => (
        <Text className="rowNumber">
          {(index + 1).toString().padStart(2, "0")}
        </Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "20%",
      ellipsis: true,

      render: (_, { created_at }) => (
        <Text>{dayjs(created_at).format("YYYY/MM/DD")}</Text>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "38%",
      render: (_, { name }) => <div>{name}</div>,
      ellipsis: true,
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
      title: "Actions",
      dataIndex: "id",
      key: "action",
      render: (id, data) => {
        return (
          <Row className="actions">
            <PenIcon
              onClick={() => {
                navigate(`${location.pathname}/${id}?edit=true`);
              }}
            />
            <CopyIcon
              onClick={() => {
                setScheduleCId(id);
                setScheduleCName(data.name);
                handleCreateScheduleC();
              }}
            />
            <SettingIcon
              onClick={() => {
                navigate(
                  decodeURIComponent(`${location.pathname}/${id}?setting=true`),
                );
              }}
            />
            <TrashIcon
              onClick={() => {
                setScheduleCId(id);
                setDeleteModalOpen(true);
              }}
            />
          </Row>
        );
      },
    },
  ];

  return (
    <WrapperStyled>
      <DivoModal
        open={deleteModalOpen}
        DeleteItemName="Schedule C"
        title="Confirm Delete?"
        okText="Confirm Delete"
        onOk={handleDeleteScheduleC}
        cancelText="Cancel"
        onCancel={() => setDeleteModalOpen(false)}
        isDeleteLoading={isDeleteLoading}
      />
      <AddScheduleC
        setOpen={setEditModalOpen}
        open={editModalOpen}
        isEdit
        scheduleCId={scheduleCId}
      />

      {isScheduleCsLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <Row className="scheduleBWrapper">
            <div className="scheduleB">
              <GoogleDrive />
              <Text color={theme.borderColorBase}>ScheduleB</Text>
            </div>
          </Row>
          <DivoTable
            data={scheduleCs}
            columns={columns}
            isLarge={false}
            loading={isScheduleCFetching && !isScheduleCsLoading}
          />
        </>
      )}
    </WrapperStyled>
  );
};
