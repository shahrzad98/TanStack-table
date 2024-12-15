import React, { FC, memo, useEffect, useState } from "react";
import { Input, Row as Row, Select, Typography } from "antd";
import { CellContext } from "@tanstack/table-core";
import styled from "@emotion/styled";
import Epic from "../../../../modules/icons/Epic";
import Task from "../../../../modules/icons/Task";
import Story from "../../../../modules/icons/Story";
import Subtask from "../../../../modules/icons/Subtask";
import Bug from "../../../../modules/icons/Bug";
import { IconPencil } from "@tabler/icons-react";
import { capitalize } from "~/utils/capitalize";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { IRow } from "~/types/dataGrid";

const WrapperStyled = styled("div")({
  ".issueTrigger": {
    position: "absolute",
    height: "100%",
    width: 4,
    left: 0,
    top: 0,
    cursor: "pointer",
  },
  ".issueMenu": {
    position: "absolute",
    top: 40,
    left: 0,
    zIndex: 2,
    svg: {
      marginRight: 5,
    },
  },
});

export const FeatureCell: FC<CellContext<IRow, any>> = memo((props) => {
  const initialValue = props.getValue();
  const { Text } = Typography;
  const [value, setValue] = useState(initialValue);
  const [issueType, setIssueType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [typeMenuVisible, setTypeMenuVisible] = useState(false);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const issueColors: { [key: string]: string } = {
    epic: "rgba(144, 84, 223, 1)",
    bug: "rgba(227, 75, 64, 1)",
    story: "rgba(102, 185, 69, 1)",
    task: "rgb(139,194,243)",
    subtask: "rgb(139,194,243)",
  };
  const featureTypes = [
    {
      type: "epic",
      icon: <Epic className="issueTypeIcon" />,
    },
    {
      type: "story",
      icon: <Story className="issueTypeIcon" />,
    },
    {
      type: "bug",
      icon: <Bug className="issueTypeIcon" />,
    },
    {
      type: "subtask",
      icon: <Subtask className="issueTypeIcon" />,
    },
    {
      type: "task",
      icon: <Task className="issueTypeIcon" />,
    },
  ];
  return (
    <WrapperStyled>
      <div
        className="issueTrigger"
        style={{
          backgroundColor: issueColors[issueType],
        }}
        onClick={() => setTypeMenuVisible(!typeMenuVisible)}
      />
      <Input
        className="editableCell"
        placeholder="Title"
        value={`${value?.title?.slice(0, 22)}${
          value?.title?.length > 22 ? "..." : ""
        }`}
        onChange={(e) => setValue(e.target.value)}
        suffix={isEditing ? <IconPencil size={16} /> : null}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
      />
      {typeMenuVisible && (
        <Select
          className="issueMenu"
          defaultValue="Issue Type"
          onChange={(value) => {
            setIssueType(value);
            setTypeMenuVisible(false);
          }}
          suffixIcon={<CloseIcon onClick={() => setTypeMenuVisible(false)} />}
          popupClassName="issueTypeMenu"
          open={typeMenuVisible}
          options={featureTypes.map((item) => ({
            value: item.type,
            label: (
              <Row align="middle" justify="start">
                <input
                  type="radio"
                  className="optionCheckbox"
                  checked={issueType === item.type}
                />
                <Row align="middle">
                  {item.icon}
                  <Text>{capitalize(item.type)}</Text>
                </Row>
              </Row>
            ),
          }))}
        />
      )}
    </WrapperStyled>
  );
});

FeatureCell.displayName = "FeatureCell";
