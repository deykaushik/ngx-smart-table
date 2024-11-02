export interface ITableColConfig {
  field: string;
  cellValueFn?: (row: any, index?: number) => any;
  headerLabel?: string;
  headerTooltip?: string;
  width?: number;
}

export enum ITableInternalKeys {
  ID = '__id',
  SELECTED = '__selected',
  DISABLED = '__disabled',
  SELECTION_DISABLED = '__selectionDiabled',
  EVEN = '__isEven',
}

export interface ITableRowState {
  [ITableInternalKeys.ID]: string;
  [ITableInternalKeys.SELECTED]?: boolean;
  [ITableInternalKeys.EVEN]?: boolean;
  [ITableInternalKeys.DISABLED]?: boolean;
}

export interface ITableColCell {
  key: string;
  label: string;
  contextData: any;
  trackById?: string | null | undefined;
  width?: number;
}

export interface ITableHeader {
  key: string;
  headerLabel?: string;
  headerTooltip?: string;
  width?: number;
}

export interface ITableRow extends ITableRowState {
  trackById?: string | null | undefined;
  colCells: ITableColCell[];
}
