import { DatableActionProps } from "types/DatatableAction";
import React, { ComponentType, FC } from "react";
import {
  MRT_Row as MRTRow,
  MRT_TableInstance,
  MRT_TableInstance as MRTTableInstance,
} from "material-react-table";
import { ApiProps } from "types/ApiProps";

export interface DatatableRowActionProps {
  data: any;
  name?: string;
  onRowClick: (item: any) => void;
  onAddItem: (item: any) => void;
  onUpdateItem: (data: any) => void;
  onRemoveItem: (item?: any) => void;
  table: MRT_TableInstance<any>;
  isLast?: boolean;
  index?: number;

  [x: string]: any;
}

export interface DatatableToolbarActionProps {
  name?: string;
  onAddItem?: any;
  onUpdateItem?: any;
  onRemoveItem?: any;
  table?: MRT_TableInstance<any>;

  [x: string]: any;
}

export interface DatatableApiProps {
  url: string;
  pathVariable?: string | number;
  params?: any;
  formatter?: (data: any) => any;
}

export interface DatatableProps {
  rows?: any;
  title?: any;
  icon?: ComponentType;
  backgroundColor?: string;
  columns: any;
  onRowSelect?: (value: any) => void;
  enableMultiRowSelection?: boolean;
  enableColumnFilters?: boolean;
  rowActionMenu?: DatableActionProps[];
  rowActions?: FC<DatatableRowActionProps>;
  toolbarActions?: FC;
  formProps?: any;
  apiProps?: ApiProps;
  enableDivider?: boolean;
  renderDetailPanel?:
    | (({
        row,
        table,
      }: {
        row: MRTRow<any>;
        table: MRTTableInstance<any>;
      }) => React.ReactNode)
    | undefined;

  [x: string]: any;
}
