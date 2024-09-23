import { useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, getSortedRowModel } from '@tanstack/react-table';
import { InterestRateData } from './Interface/Data';
import arrowUp from './assets/arrowUp.svg';
import arrowDown from './assets/arrowDown.svg';
import { useQuery } from '@tanstack/react-query';
import { fetchInterestRatesVivienda } from './path-to-api-functions';

type SortingState = { id: string; desc: boolean }[];

function InterestRatesTableVivienda() {
  const { data, status } = useQuery({queryKey:['interestRatesVivienda'], queryFn:fetchInterestRatesVivienda});
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<InterestRateData>[] = [
    {
      accessorKey: 'nombre_entidad',
      header: 'Banco',
    },
    {
      accessorKey: 'tipo_de_cr_dito',
      header: 'Tipo de crédito',
    },
    {
      accessorKey: 'tasa_efectiva_promedio',
      header: 'Interés promedio',
      cell: (cell) => {
        const roundedValue = Number(cell.getValue()).toFixed(2);
        return `${roundedValue}%`;      
      },
    },
  ];

  const table = useReactTable({
    data: data || [], 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortingState = sorting.find((sort) => sort.id === header.id);
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {sortingState && (
                      sortingState.desc ? <img src={arrowDown} alt="Descendente" /> : <img src={arrowUp} alt="Ascendente" />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterestRatesTableVivienda;
