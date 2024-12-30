"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/Shared/DataTable/data-table";
import { DataTablePagination } from "./data-table-pagination";
import { OrderDataTableToolbar } from "./toolbar";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationProps;
}

export function OrderDataTable<TData, TValue>({
  columns,
  data,
  pagination,
}: DataTableProps<TData, TValue>) {
  const rowSelectionEnabled = false;

  const table = useReactTable({
    data,
    columns,
    state: {},
    enableRowSelection: rowSelectionEnabled,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <OrderDataTableToolbar table={table} />
      <DataTable table={table} noDataMessage="No records found." />
      {pagination && (
        <DataTablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalRows={pagination.totalRows}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </div>
  );
}
