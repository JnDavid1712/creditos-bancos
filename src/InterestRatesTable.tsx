import { useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, getSortedRowModel } from '@tanstack/react-table';
import arrowUp from './assets/arrowUp.svg';
import arrowDown from './assets/arrowDown.svg';
import { InterestRateData } from './Interface/Data';

type SortingState = { id: string; desc: boolean }[];

function InterestRatesTable({
  columns,
  data,
  status,
  setModalData,
  setIsModalOpen,
}: {
  columns: ColumnDef<InterestRateData>[];
  data: InterestRateData[] | undefined;
  status: string;
  setModalData: React.Dispatch<React.SetStateAction<Record<string, InterestRateData>>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const [sorting, setSorting] = useState<SortingState>([]);

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

  const handleModal = (rowData: Record<string, InterestRateData>) => {
    setModalData(rowData);
    setIsModalOpen(true);
  };


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
              <th
                key="actions"
                onClick={undefined}
              >
                Acciones
              </th>
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
              <td
                onClick={() => handleModal(row.original)}
              >
                <button>Simular</button>
              </td>
            </tr>
          ))}
           
        </tbody>
      </table>
    </div>
  );
}

export default InterestRatesTable;
