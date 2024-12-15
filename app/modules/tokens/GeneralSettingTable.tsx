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
import ThreeDotsActive from "../../modules/icons/ThreeDotsActive";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generalSettingsKey } from "~/utils/queryKeys";
import { deleteGeneralSetting, getGeneralSettings } from "~/api/handler/token";
import { IGeneralSetting, IGeneralSettingData } from "~/types/token";
import { isHttpError } from "~/types/global";
import { AddGeneralSetting } from "./form";
import { Delete, Edit } from "../shared";
import {
  FaRegEye as EyeIcon,
  FaRegEyeSlash as EyeClosedIcon,
} from "react-icons/fa6";

export const GeneralSettingTable = () => {
  const { Text } = Typography;
  const queryClient = useQueryClient();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<IGeneralSetting>();
  const [generalSettingId, setGeneralSettingId] = useState("");
  const [isValueVisible, setIsValueVisible] = useState<{
    [key: string]: Boolean;
  }>({ 1: false });
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const {
    data: generalSettings,
    error: generalSettingsError,
    isLoading: isGeneralSettingsLoading,
    isFetching: isGeneralSettingsFetching,
  } = useQuery([generalSettingsKey], () => getGeneralSettings(), {
    initialData: queryClient.getQueryData([generalSettingsKey]),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (isHttpError(generalSettingsError)) {
      notification.error(
        generalSettingsError?.message ?? "Something went wrong!",
      );
    }
  }, [generalSettingsError]);

  const { mutate: handleGeneralSetting, isLoading: isDeleteLoading } =
    useMutation(() => deleteGeneralSetting(generalSettingId), {
      onSuccess: () => {
        void queryClient.invalidateQueries([generalSettingsKey]);
        setDeleteModalOpen(false);

        notification.success("General Setting Successfully Deleted.");
      },
    });
  const columns: ColumnsType<IGeneralSettingData> = [
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
      title: "Key",
      dataIndex: "key",
      key: "key",
      width: "40%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "40%",
      render: (_, { value, id }) => (
        <Text>{isValueVisible[id] ? value : "*******"}</Text>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Row>
          {isValueVisible[id] ? (
            <EyeClosedIcon onClick={() => setIsValueVisible({ [id]: false })} />
          ) : (
            <EyeIcon onClick={() => setIsValueVisible({ [id]: true })} />
          )}
        </Row>
      ),
    },
    {
      title: "",
      dataIndex: "id",
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
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
            onMouseEnter={() => {
              setGeneralSettingId(id);
              setInitialData(data);
            }}
          />
        </DivoDropdown>
      ),
    },
  ];

  return (
    <>
      <AddGeneralSetting
        setOpen={setEditModalOpen}
        open={editModalOpen}
        isEdit
        settingId={generalSettingId}
        initialData={initialData as IGeneralSetting}
      />
      <DivoModal
        open={deleteModalOpen}
        DeleteItemName="Employee"
        title="Confirm Delete?"
        okText="Confirm Delete"
        cancelText="Cancel"
        onOk={() => handleGeneralSetting()}
        onCancel={() => setDeleteModalOpen(false)}
        isDeleteLoading={isDeleteLoading}
      />
      {isGeneralSettingsLoading ? (
        <TableSkeleton />
      ) : (
        <DivoTable
          data={generalSettings}
          columns={columns}
          isLarge={false}
          loading={isGeneralSettingsFetching && !isGeneralSettingsLoading}
        />
      )}
    </>
  );
};
