import * as React from "react"

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const Table: React.FC<TableProps> = ({ className, ...props }) => (
  <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${className || ""}`}>
    <table className="min-w-full divide-y divide-gray-200">
      {props.children}
    </table>
  </div>
)
export const TableHead: React.FC<TableHeadProps> = ({ className, ...props }) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className || ""}`} {...props} />
)
export const TableRow: React.FC<TableRowProps> = ({ className, ...props }) => (
  <tr className={`hover:bg-gray-50 transition ${className || ""}`} {...props} />
)
export const TableCell: React.FC<TableCellProps> = ({ className, ...props }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className || ""}`} {...props} />
)
