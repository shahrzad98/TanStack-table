import { CiStickyNote as NoteIcon } from "react-icons/ci";
import { FC, memo } from "react";
import { CellContext } from "@tanstack/table-core";
import { IRow } from "../../types/dataGrid";
import { FaPlus as PlusIcon } from "react-icons/fa6";

type NoteCellProps = CellContext<IRow, any> & {
  setEditorVisible?: (value: boolean) => void;
};

export const NoteCell: FC<NoteCellProps> = memo(
  ({ setEditorVisible, getValue }) => {
    const initialValue = getValue();
    return (
      <div className="noteIcon">
        {initialValue ? (
          <NoteIcon size={20} onClick={() => setEditorVisible!(true)} />
        ) : (
          <PlusIcon
            onClick={() => setEditorVisible!(true)}
            className="addNoteIcon"
          />
        )}
      </div>
    );
  },
);

NoteCell.displayName = "NoteCell";
