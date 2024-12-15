import React, { memo, useEffect, useState } from "react";
import { AutoComplete, Avatar, Input, Row, Typography } from "antd";
import { assigneeOptions } from "../mockData";
import { CellWrapperStyled } from "../cellWrrapper";
import { CellContext } from "@tanstack/table-core";
import {
  CiSearch as SearchIcon,
  CiStickyNote as NoteIcon,
  CiUser as UserIcon,
} from "react-icons/ci";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "~/components";
import { dataGridsKey, employeesKey } from "~/utils/queryKeys";
import { updateCellById } from "~/api/handler/dataGrid";
import { ICell, IRow } from "~/types/dataGrid";
import { useDebouncedCallback } from "@mantine/hooks";
import { getEmployees, updateEmployeeProjects } from "~/api/handler/employees";
import { isHttpError } from "~/types/global";
import { useParams } from "@remix-run/react";

type DynamicCellProps = CellContext<IRow, any> & {
  has_note?: boolean;
  is_assignable?: boolean;
  is_commentable?: boolean;
  is_modifiable?: boolean;
  setEditorVisible?: (value: boolean) => void;
  defaultValue?: string;
  cellData?: Partial<ICell>;
  isParent?: boolean;
};

export const DynamicCell = memo(
  ({
    has_note,
    is_assignable,
    is_commentable,
    is_modifiable,
    setEditorVisible,
    defaultValue,
    cellData,
    isParent,
  }: DynamicCellProps) => {
    const params = useParams();
    const queryClient = useQueryClient();
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchedEmployee, setSearchedEmployee] = useState("");

    const { mutate: handleUpdateSOW } = useMutation({
      mutationFn: (searchedEmployee: string) =>
        updateEmployeeProjects(searchedEmployee, {
          projects: [params.projectId as string],
        }),
      onSuccess: () => {
        notification.success("SOW updated successfully!");
        void queryClient.invalidateQueries([employeesKey]);
      },
    });

    const { data: employees, error: employeesError } = useQuery(
      [employeesKey],
      () => getEmployees().then((res) => res?.data),
      {
        initialData: queryClient.getQueryData([employeesKey]),
      },
    );
    useEffect(() => {
      if (isHttpError(employeesError)) {
        notification.error(employeesError?.message ?? "Something went wrong!");
      }
    }, [employeesError]);

    const [optionsState, setOptionsState] = useState<
      {
        value: string;
        label: React.JSX.Element;
      }[]
    >();
    useEffect(() => {
      setOptionsState(
        employees?.map((E) => {
          const fullName = E.user.first_name + " " + E.user.last_name;
          return {
            value: E.id,
            label: (
              <Row justify="space-between">
                {fullName.slice(0, 20)} {fullName.length > 20 ? "..." : null}
                <Avatar shape="circle" size={24} icon={<UserIcon />} />
              </Row>
            ),
          };
        }),
      );
    }, [employees]);

    const { Text } = Typography;
    const handleSearch = (value: string) => {
      setOptionsState(assigneeOptions);
      setOptionsState((prev) => prev?.filter((el) => el.value.includes(value)));
    };

    const { mutate: handleUpdateCellById } = useMutation({
      mutationFn: (value: string) =>
        updateCellById(
          params.projectId as string,
          params.SOWId as string,
          params.scheduleCId as string,
          { cell: { ...cellData, value } },
        ),
      onSuccess: () => {
        notification.success("SOW updated successfully!");
        void queryClient.invalidateQueries([dataGridsKey]);
      },
    });

    const updateCellByIdCallback = useDebouncedCallback((value: string) => {
      handleUpdateCellById(value);
    }, 700);

    return (
      <CellWrapperStyled>
        {!searchedEmployee && is_assignable ? (
          <PlusIcon
            onClick={() => setSearchVisible(true)}
            className="assigneeIcon"
          />
        ) : null}

        <div className="cellWrapper">
          {/*{*/}
          {/*  optionsState.find((el) => el.value == searchValue)?.label.props*/}
          {/*    .children[0]*/}
          {/*}*/}
          {is_modifiable && !isParent ? (
            <Input
              className="editableCell"
              defaultValue={defaultValue ?? ""}
              onChange={(e) => {
                updateCellByIdCallback(e.target.value);
              }}
            />
          ) : (
            <Text>{defaultValue}</Text>
          )}

          <div>
            {(has_note || is_commentable) && (
              <NoteIcon
                size={13}
                className="noteIcon"
                onClick={() => setEditorVisible?.(true)}
              />
            )}
            <div className="assigneeImage">
              {
                optionsState?.find((el) => el.value == searchedEmployee)?.label
                  .props.children[1]
              }
            </div>
          </div>
        </div>

        <div
          style={{
            display: searchVisible ? "block" : "none",
          }}
          className="searchWrapper"
        >
          <AutoComplete
            onSearch={handleSearch}
            onSelect={(value) => {
              setSearchedEmployee(value);
              handleUpdateSOW(value);
              setSearchVisible(false);
            }}
            className="searchEmployee"
            options={optionsState}
            size="large"
          >
            <Input
              size="large"
              placeholder="Search"
              prefix={<SearchIcon />}
              addonAfter={<CloseIcon onClick={() => setSearchVisible(false)} />}
            />
          </AutoComplete>
        </div>
      </CellWrapperStyled>
    );
  },
);

DynamicCell.displayName = "DynamicCell";
