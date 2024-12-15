export interface IColumn {
  id?: string;
  name: string;
  order: number;
  slug: string;
  value?: number;
  has_note: boolean;
  is_assignable: boolean;
  is_commentable: boolean;
  is_modifiable: boolean;
  formula: string;
  input_status?: string;
  team_view: boolean;
  admin_view: boolean;
  client_view: boolean;
  team_can_edit: boolean;
}

export interface IDataGrid {
  id: string;
  project_code: string;
  phase_title: string;
  phase_number: string;
  columns: IColumn[];
  rows: IRow[];
  cells: ICell[];
}

export interface IDataGridResponse {
  data: IDataGrid;
}

export interface IColumnData {
  column: Partial<IColumn>;
}

type RowKind = "epic" | "story" | "task" | "bug" | "feature" | "sub-task";

export interface IRow {
  id: string;
  title: string;
  description: string;
  order: number;
  parent_id: string | null;
  kind: RowKind;
}

export interface IRowData {
  row: IRow;
}

export interface Assignee {
  id: string;
  name: string;
}

export interface ICell {
  id: string;
  column_id: string;
  row_id: string;
  value: string;
  assignee: Assignee;
  input_status: string;
  note: string;
}

export interface ICellData {
  cell: ICell;
}

export interface ICellUpdate {
  cell: {
    value: string;
  };
}

export interface ICellUpdateById {
  cell: Partial<ICell>;
}

export interface IDataGridBody {
  doc: string;
}
