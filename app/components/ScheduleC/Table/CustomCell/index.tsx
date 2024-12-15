import React, { memo, ReactNode } from "react";
import {
  DynamicCell,
  EpicCell,
  FeatureCell,
  NoteCell,
} from "../../../../components";
import { CellContext } from "@tanstack/table-core";
import { ICell, IRow } from "../../../../types/dataGrid";

type CustomCellProps = CellContext<IRow, any> & {
  type?: "epic" | "feature" | "note" | "dynamicCell";
  setEditorVisible?: (value: boolean) => void;
  defaultValue?: string;
  has_note?: boolean;
  is_assignable?: boolean;
  is_commentable?: boolean;
  is_modifiable?: boolean;
  isParent?: boolean;
  cellData?: Partial<ICell>;
};

export const CustomCell = memo(({ type, ...props }: CustomCellProps) => {
  const cellTypes: { [key: string]: ReactNode } = {
    feature: <FeatureCell {...props} />,
    epic: <EpicCell {...props} />,
    note: <NoteCell {...props} />,
    dynamicCell: <DynamicCell {...props} />,
  };
  return <>{cellTypes[type as string]}</>;
});

CustomCell.displayName = "CustomCell";
