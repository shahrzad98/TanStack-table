import {
  Button,
  Input,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { FC, useState } from "react";
import GoogleDriveIcon from "../../modules/icons/GoogleDrive";
import styled from "@emotion/styled";
import { theme } from "~/styles";
import { IconPencil, IconSettings } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dataGridsKey, scheduleCKey } from "~/utils/queryKeys";
import { editScheduleC, getScheduleC } from "~/api/handler/scheduleC";

import { getDataGrids } from "~/api/handler/dataGrid";
import { notification } from "~/components";
import { IScheduleCBody, IScheduleCStatus } from "~/types/scheduleC";
import { capitalize } from "~/utils/capitalize";
import { useDebouncedCallback } from "@mantine/hooks";
import { useParams } from "@remix-run/react";

const WrapperStyled = styled("div")({
  height: "16vh",
  ".projectInfo": {
    color: theme.primaryColor,
    fontWeight: 600,
    "& svg": {
      position: "relative",
      top: 3,
      marginRight: 5,
    },
  },

  "& .timeSwitch": {
    height: 41,
    backgroundColor: "white",
    padding: 5,
    "& .active": {
      color: theme.primaryColor,
      backgroundColor: "#D9EDFF",
    },
    div: {
      backgroundColor: "white",
      transition: "background-color 100ms linear",
      padding: "6px 20px",
      cursor: "pointer",
      borderRadius: 3,
    },
  },
  ".editIcon": {
    marginRight: 8,
  },
  "& .counter": {
    width: 36,
    height: 36,
    fontSize: 12,
    fontWeight: 500,
    margin: "0 8px",
  },
  "& .spentTime": {
    button: {
      fontSize: 16,
      fontWeight: 600,
      height: 40,
      marginRight: 5,
    },
    span: {
      fontSize: 16,
      fontWeight: 400,
      marginRight: 5,
    },
  },
  ".projectTitleWrapper": {
    marginTop: 25,
    svg: {
      cursor: "pointer",
    },
  },
  ".projectTitle": {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 16,
    height: 52,
    width: 400,
    h3: {
      margin: "0 12px",
    },
    ".ant-input": {
      width: 355,
      border: "none",
      fontSize: 24,
      fontWeight: 600,
      "&:focus": {
        boxShadow: "none",
      },
    },
  },
  ".ant-select-selector": {
    fontSize: 20,
  },
  ".export": {
    width: 150,
    height: 52,
    marginRight: 20,
  },
  ".status": {
    width: 207,
    height: 52,
    marginRight: 20,
    fontWeight: 600,
  },
  ".settings": {
    marginTop: 20,
  },
  ".settingItem": {
    marginRight: 10,
    ".value": {
      width: "max-content",
      backgroundColor: "#fff",
      textAlign: "center",
      height: 36,
      minWidth: 46,
      borderRadius: 7,
      border: "1px solid rgba(38, 132, 255, 1)",
      margin: "0 10px",
      span: {
        position: "relative",
        top: 5,
      },
    },
  },
});

type View = "Owner" | "Team" | "Client";

interface ScheduleCHeaderProps {
  view: View | undefined;
}

export const DataGridHeader: FC<ScheduleCHeaderProps> = ({ view }) => {
  const params = useParams();

  const [isActive, setIsActive] = useState({ hours: true, days: false });
  const [property, setProperty] = useState("title");
  const [editMode, setEditMode] = useState(false);
  const { Text, Title } = Typography;
  const queryClient = useQueryClient();
  const { mutate: handleUpdateScheduleC, isLoading: updateScheduleCLoading } =
    useMutation([scheduleCKey], {
      mutationFn: (values: IScheduleCBody) =>
        editScheduleC(
          params.projectId as string,
          params.SOWId as string,
          params.scheduleCId as string,
          values,
        ),
      onSuccess: () => {
        queryClient.invalidateQueries([scheduleCKey]);
        setProperty("title");
        notification.success("ScheduleC updated successfully!");
      },
    });
  const { data: dataGridInfo, isLoading: dataGridLoading } = useQuery(
    [dataGridsKey],
    () =>
      getDataGrids(
        params.projectId as string,
        params.SOWId as string,
        params.scheduleCId as string,
      ).then((res) => res?.data),
    {
      initialData: queryClient.getQueryData([dataGridsKey]),
      enabled: !!params,
    },
  );
  const { data: scheduleCInfo, isLoading: scheduleCInfoLoading } = useQuery(
    [scheduleCKey(params.scheduleSId as string)],
    () =>
      getScheduleC(
        params.projectId as string,
        params.SOWId as string,
        params.scheduleCId as string,
      ),
    {
      initialData: queryClient.getQueryData([
        scheduleCKey(params.scheduleSId as string),
      ]),
      enabled: !!params,
      select: (data) => data.data,
    },
  );

  const statusColors: { [key: string]: string } = {
    draft: theme.lightGray,
    approved: theme.divnotesGreen,
    client_review: theme.alert,
    rejected: theme.error,
    completed: theme.divnotesPurple,
  };

  const updateScheduleCCallback = useDebouncedCallback((value: string) => {
    handleUpdateScheduleC({ name: value });
  }, 400);

  if (dataGridLoading) return <Skeleton active />;
  return (
    <WrapperStyled style={{ marginBottom: view === "Owner" ? 60 : 20 }}>
      <Row justify="space-between">
        <Row align="middle">
          <Button type="primary" danger>
            [ {dataGridInfo?.project_code} ]
          </Button>
          <Button className="projectInfo">{dataGridInfo?.phase_number}</Button>
          <Button className="projectInfo">
            <GoogleDriveIcon />
            Schedule B
          </Button>
          {view === "Owner" && (
            <>
              <Select
                className="export"
                defaultValue="Export as"
                options={[
                  { value: "pdf", label: "PDF" },
                  { value: "csv", label: "CSV" },
                  { value: "xlsx", label: "XLSX" },
                  { value: "jira", label: "Jira" },
                ]}
              />
              <Select
                className="status"
                defaultValue={scheduleCInfo?.status}
                suffixIcon={
                  updateScheduleCLoading && property === "status" ? (
                    <Spin size="small" />
                  ) : undefined
                }
                onClick={() => setProperty("status")}
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "client_review", label: "Client Review" },
                  { value: "approved", label: "Approved" },
                  { value: "estimation", label: "Estimation" },
                ]}
                onSelect={(value) => {
                  handleUpdateScheduleC({ status: value as IScheduleCStatus });
                }}
              />
            </>
          )}
          {view !== "Owner" && (
            <Button
              className="status"
              loading={scheduleCInfoLoading}
              style={{ color: statusColors[scheduleCInfo?.status ?? ""] }}
            >
              {capitalize(scheduleCInfo?.status ?? "")}
            </Button>
          )}
        </Row>
        <div>
          <Row align="middle">
            <Text>Hours/Day</Text>
            <Button className="counter">7</Button>

            <Row className="timeSwitch">
              <div
                className={`hours ${isActive["hours"] ? "active" : ""}`}
                onClick={() => setIsActive({ days: false, hours: true })}
              >
                Hours
              </div>
              <div
                className={isActive["days"] ? "active" : ""}
                onClick={() => setIsActive({ hours: false, days: true })}
              >
                Days
              </div>
            </Row>
          </Row>
        </div>
      </Row>
      <Row
        align="middle"
        justify="space-between"
        className="projectTitleWrapper"
      >
        <Row align="middle">
          <Row justify="space-between" align="middle" className="projectTitle">
            {editMode ? (
              <Input
                suffix={
                  updateScheduleCLoading &&
                  property === "title" && <Spin size="small" />
                }
                defaultValue={scheduleCInfo?.name}
                onChange={(e) => {
                  updateScheduleCCallback(e.target.value);
                }}
              />
            ) : (
              <Title level={3}>{scheduleCInfo?.name}</Title>
            )}

            {property == "title" && !updateScheduleCLoading && (
              <IconPencil
                className="editIcon"
                onClick={() => {
                  setProperty("title");
                  setEditMode(true);
                }}
              />
            )}
          </Row>
          <IconSettings />
        </Row>
        <div className="spentTime">
          <Text>Total Project Hours</Text>
          <Space direction="horizontal" size="large">
            <Button>1,258.73</Button>
            <Text>Total Project Days</Text>
          </Space>
          <Button>179.82</Button>
        </div>
      </Row>
      {view === "Owner" && (
        <Row className="settings">
          <Row align="middle">
            <Row className="settingItem" align="middle">
              <Text>QAT</Text>
              <div className="value">
                <Text>5%</Text>
              </div>
            </Row>
            <Row className="settingItem" align="middle">
              <Text>Team Lead</Text>
              <div className="value">
                <Text>5%</Text>
              </div>
            </Row>
            <Row className="settingItem" align="middle">
              <Text>Admin</Text>
              <div className="value">
                <Text>5%</Text>
              </div>
            </Row>
            <Row className="settingItem" align="middle">
              <Text>PM</Text>
              <div className="value">
                <Text>5%</Text>
              </div>
            </Row>
            <Row className="settingItem" align="middle">
              <Text>Buffer</Text>
              <div className="value">
                <Text>5%</Text>
              </div>
            </Row>
            <Row className="settingItem" align="middle">
              <Text>Rate</Text>
              <div className="value">
                <Text>5%</Text>
              </div>
            </Row>
          </Row>
        </Row>
      )}
    </WrapperStyled>
  );
};
