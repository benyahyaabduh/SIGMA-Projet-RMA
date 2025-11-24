import { MRT_PaginationState } from "material-react-table";

export interface ApiProps {
  url: string;
  pathVariable?: string | number | null;
  method?: "POST" | "GET";
  params?: any;
  enabled?: boolean;
  formatter?: (rows: any[]) => any[];
  // formatter?:
  //   | ((rows: any[]) => any[])
  //   | (({ intl, data }: { intl: any; data: any[] }) => any[]);
  intlFormatter?: ({ intl, data }: { intl: any; data: any[] }) => any[];
  filter?: (row: any) => boolean;
  columnFilters?: any[];
  columnFilterFns?: any;
  sorting?: any[];
  enableSorting?: boolean;
  pagination?: MRT_PaginationState;
}
