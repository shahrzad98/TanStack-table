import {
  DivoDropdown,
  DivoModal,
  DivoTable,
  notification,
  TableSkeleton,
} from "~/components";
import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Typography } from "antd";
import ThreeDotsActive from "../../modules/icons/ThreeDotsActive";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tokensKey } from "~/utils/queryKeys";
import { deleteToken, getTokens } from "~/api/handler/token";
import { ITokenData, ITokenRequest } from "~/types/token";
import { isHttpError } from "~/types/global";
import { AddToken } from "./form";
import { Delete, Edit } from "../shared";

export const TokenTable = () => {
  const { Text } = Typography;
  const queryClient = useQueryClient();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<ITokenData>();
  const [tokenId, setTokenId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const {
    data: tokens,
    error: tokensError,
    isLoading: isTokensLoading,
    isFetching: isTokensFetching,
  } = useQuery([tokensKey], () => getTokens(), {
    initialData: queryClient.getQueryData([tokensKey]),
    select: (data) => data.accounts,
  });

  useEffect(() => {
    if (isHttpError(tokensError)) {
      notification.error(tokensError?.message ?? "Something went wrong!");
    }
  }, [tokensError]);

  const { mutate: handleDeleteToken, isLoading: isDeleteLoading } = useMutation(
    () => deleteToken(tokenId),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([tokensKey]);
        setDeleteModalOpen(false);

        notification.success("Employee Successfully Deleted.");
      },
    },
  );
  const columns: ColumnsType<ITokenData> = [
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
      title: "Token Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      width: "40%",
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
              setTokenId(id);
              setInitialData(data);
            }}
          />
        </DivoDropdown>
      ),
    },
  ];

  return (
    <>
      <AddToken
        setOpen={setEditModalOpen}
        open={editModalOpen}
        isEdit
        tokenId={tokenId}
        initialData={initialData as ITokenRequest}
      />
      <DivoModal
        open={deleteModalOpen}
        DeleteItemName="Employee"
        title="Confirm Delete?"
        okText="Confirm Delete"
        cancelText="Cancel"
        onOk={() => handleDeleteToken()}
        onCancel={() => setDeleteModalOpen(false)}
        isDeleteLoading={isDeleteLoading}
      />
      {isTokensLoading ? (
        <TableSkeleton />
      ) : (
        <DivoTable
          data={tokens}
          columns={columns}
          isLarge={false}
          loading={isTokensFetching && !isTokensLoading}
        />
      )}
    </>
  );
};
