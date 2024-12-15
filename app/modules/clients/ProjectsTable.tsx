import { ColumnsType } from "antd/es/table";
import {
  DivoDropdown,
  DivoModal,
  DivoTable,
  notification,
  TableSkeleton,
} from "~/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectsKey } from "~/utils/queryKeys";
import { deleteProject, getProjects } from "~/api/handler/project";
import { Row, Typography } from "antd";
import { FiCircle } from "react-icons/fi";
import ThreeDotsActive from "../../modules/icons/ThreeDotsActive";
import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { isHttpError } from "~/types/global";
import { capitalize } from "~/utils/capitalize";
import { AddProject } from "~/modules";
import { Delete, Edit } from "../shared";
import { useParams } from "@remix-run/react";
import { IProjectData } from "~/types/client";

export const ProjectsTable = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { Text } = Typography;
  const theme = useTheme();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [projectId, setProjectId] = useState("");
  const [initialData, setInitialData] = useState<IProjectData>();
  const clientId = params.clientId;
  const columns: ColumnsType<IProjectData> = [
    {
      title: <Text className="rowNumber">#</Text>,
      dataIndex: "key",
      key: "#",
      width: "10%",
      render: (_, row, index) => (
        <Text className="rowNumber">
          {(index + 1).toString().padStart(2, "0")}
        </Text>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: "10%",
      render: (_, { code }) => <Text>{code}</Text>,
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      width: "50%",
      render: (_, { name }) => <div data-cy="table_first_name">{name}</div>,
      ellipsis: true,
    },

    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      key: "status",
      render: (_, { status }) => {
        const colors: { [key: string]: string } = {
          discovery: theme.lightGray,
          lost: theme.error,
          sales: theme.sales,
          won: theme.success,
          estimation: theme.warning,
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
      width: "7%",
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
                setProjectId(id);
                setInitialData(data);
              }}
            />
          </DivoDropdown>
        );
      },
    },
  ];

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isFetching: isProjectsFetching,
    error: projectsError,
  } = useQuery(
    [projectsKey],
    () => getProjects(clientId as string).then((res) => res?.data),
    {
      enabled: !!location,
    },
  );

  const { mutate: handleDeleteProject } = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      notification.success("Project deleted successfully!");
      void queryClient.invalidateQueries([projectsKey]);
    },
  });

  useEffect(() => {
    if (isHttpError(projectsError)) {
      notification.error(projectsError?.message || "Something went wrong!");
    }
  }, [projectsError]);

  return (
    <>
      <DivoModal
        open={deleteModalOpen}
        DeleteItemName="Project"
        title="Confirm Delete?"
        okText="Confirm Delete"
        cancelText="Cancel"
        onOk={() => handleDeleteProject()}
        onCancel={() => setDeleteModalOpen(false)}
      />
      <AddProject
        setOpen={setEditModalOpen}
        open={editModalOpen}
        isEdit
        projectId={projectId}
        initialData={initialData}
      />
      {isProjectsLoading ? (
        <TableSkeleton />
      ) : (
        <DivoTable
          columns={columns}
          data={projectsData}
          isLarge={false}
          hasRowRedirect
          loading={isProjectsFetching && !isProjectsLoading}
        />
      )}
    </>
  );
};
