import { useDrag, useDrop } from "react-dnd";
import { flexRender, Row } from "@tanstack/react-table";
import { FC } from "react";
import { IRow } from "~/types/dataGrid";

export const DraggableRow: FC<{
  row: Row<IRow>;
  selectedRows: Row<IRow>[];
  data: IRow[];
  setData: (data: IRow[]) => void;
}> = ({ row, data, setData }) => {
  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as IRow);
    setData([...data]);
  };

  const [, dropRef] = useDrop({
    accept: "row",
    drop: (draggedRow: Row<IRow>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef] = useDrag({
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    item: () => row,
    type: "row",
  });
  return (
    <tr
      ref={dropRef}
      style={{
        backgroundColor: isDragging ? "rgba(217, 237, 255, 1)" : "unset",
        left: isDragging ? 20 : 0,
        position: "relative",
        transition: "left 300ms",
      }}
    >
      {row.getVisibleCells().map((cell, index) => (
        <td
          key={cell.id}
          ref={index === 0 ? dragRef : null}
          className="cell"
          style={{
            width: cell.column.getSize(),
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
