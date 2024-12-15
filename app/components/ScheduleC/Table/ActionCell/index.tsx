import { Text } from "@mantine/core";
import { IconDots, IconPlus, IconTrash } from "@tabler/icons-react";
import { Dropdown, Row } from "antd";
import { memo } from "react";
import { useWhyDidYouUpdate } from "~/hooks/useWhyDidYouUpdate";
import { CellContext } from "@tanstack/table-core";
import { IRow } from "~/types/dataGrid";

type ActionCellProps = CellContext<IRow, any> & {
  addRow: () => void;
  deleteRow: () => void;
};
export const ActionCell = memo(
  ({ addRow, deleteRow, ...props }: ActionCellProps) => {
    useWhyDidYouUpdate("ActionCell", props);
    const items = [
      {
        key: "1",
        label: (
          <Row align="middle" onClick={addRow}>
            <IconPlus />
            <Text>Add new</Text>
          </Row>
        ),
      },
      {
        key: "2",
        label: (
          <Row align="middle" onClick={deleteRow}>
            <IconTrash />
            <Text>Delete</Text>
          </Row>
        ),
      },
    ];
    return (
      <Dropdown placement="bottom" menu={{ items: items }}>
        <IconDots size={15} />
      </Dropdown>
    );
  },
);

ActionCell.displayName = "ActionCell";
