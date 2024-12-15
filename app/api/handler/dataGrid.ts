import { api } from "~/api/apiClient";
import {
  ICellUpdate,
  ICellUpdateById,
  IColumnData,
  IDataGridBody,
  IDataGridResponse,
  IRowData,
} from "~/types/dataGrid";

export const getDataGrids = (
  projectId: string,
  SOWId: string,
  scheduleId: string,
) =>
  api.get<IDataGridResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleId}/datagrids`,
  );

export const createDataGrid = (
  projectId: string,
  SOWId: string,
  scheduleId: string,
  dataGrid: IDataGridBody,
) =>
  api.post<IDataGridResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleId}/datagrids`,
    dataGrid,
  );

export const createColumn = (
  projectId: string,
  SOWId: string,
  scheduleCId: string,
  column: IColumnData,
) =>
  api.post<IColumnData>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleCId}/datagrids/columns`,
    column,
  );

export const editColumn = (
  projectId: string,
  SOWId: string,
  scheduleId: string,
  columnId: string,
  column: IColumnData,
) =>
  api.put<IColumnData>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleId}/datagrids/columns/${columnId}`,
    column,
  );

export const deleteColumn = (
  projectId: string,
  SOWId: string,
  scheduleId: string,
  columnId: string,
) =>
  api.delete<IColumnData>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleId}/datagrids/columns/${columnId}`,
  );

export const createRow = (
  projectId: string,
  SOWId: string,
  scheduleId: string,
  row: IRowData,
) =>
  api.post<IDataGridResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleId}/datagrids/rows`,
    row,
  );

export const editRow = (
  projectId: string,
  SOWId: string,
  scheduleId: string,
  rowId: string,
  row: IRowData,
) =>
  api.put<IDataGridResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleId}/datagrids/rows/${rowId}`,
    row,
  );

export const updateCellById = (
  projectId: string,
  SOWId: string,
  scheduleId: string,
  cell: ICellUpdateById,
) =>
  api.put<IDataGridResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleId}/datagrids/cells`,
    cell,
  );

export const updateCellByEmployee = (
  projectId: string,
  SOWId: string,
  scheduleId: string,
  cellId: string,
  cell: ICellUpdate,
) =>
  api.put<IDataGridResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleId}/datagrids/cells/${cellId}`,
    cell,
  );
