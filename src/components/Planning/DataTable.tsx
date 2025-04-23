import React from 'react'
import { Table, TableHeader, TableRow, Td } from "../../styles/table";

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  emptyMessage = "Nenhum dado disponível"
}: {
  data: T[];
  columns?: (keyof T)[];
  emptyMessage?: string;
}) => {
  // Error handling for empty data
  if (!data || data.length === 0) {
    return <div className="p-4 text-center text-gray-500">{emptyMessage}</div>;
  }
  const tableColumns = columns || Object.keys(data[0]) as (keyof T)[];

  return (
    <Table className="w-full">
      <thead>
        <tr>
          {tableColumns.map(key => (
            <TableHeader
              key={String(key)}
              className="text-left py-2 border-b capitalize"
            >
              {String(key).replace(/([A-Z])/g, ' $1').trim()}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {tableColumns.map(key => (
              <Td key={String(key)} className="py-2 border-b">
                {String(item[key] || '-')}
              </Td>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};