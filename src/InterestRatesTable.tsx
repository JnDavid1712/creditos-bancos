import { useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, getSortedRowModel } from '@tanstack/react-table';
import arrowUp from './assets/arrowUp.svg';
import arrowDown from './assets/arrowDown.svg';
import { InterestRateData, ModalData } from './Interface/Data';

type SortingState = { id: string; desc: boolean }[];

function InterestRatesTable({
  columns,
  data,
  status,
  setModalData,
  setIsModalOpen,
  dataType,
}: {
  columns: ColumnDef<InterestRateData>[];
  data: InterestRateData[] | undefined;
  status: string;
  setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataType: string;
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

  const handleModal = (rowData: InterestRateData) => {
    setModalData({ data: rowData, type: dataType, closeModal: () => setIsModalOpen(false) });
    setIsModalOpen(true);
  };

  const evaluateBestRate = (rowData: InterestRateData) => {
    if (!data || data.length === 0) return false;

    if ('producto_de_cr_dito' in data[0]) {
      const libreInversionArray = data.filter((item) => item.producto_de_cr_dito === 'Libre inversión');
      const vehiculoArray = data.filter((item) => item.producto_de_cr_dito === 'Vehículo');

      const arrayToCompare = rowData.producto_de_cr_dito === 'Libre inversión' ? libreInversionArray : vehiculoArray;

      const bestRate = arrayToCompare.reduce((acc: InterestRateData, current: InterestRateData) => {
        const currentRate: GLfloat = parseFloat(current.tasa_efectiva_promedio);
        const accRate = parseFloat(acc.tasa_efectiva_promedio);
        return currentRate < accRate ? current : acc;
      }, arrayToCompare[0]);

      return parseFloat(rowData.tasa_efectiva_promedio) === parseFloat(bestRate?.tasa_efectiva_promedio);

    };

    const bestRate = data.reduce((acc, current) => {
      const currentRate = parseFloat(current.tasa_efectiva_promedio);
      const accRate = parseFloat(acc.tasa_efectiva_promedio);
      return currentRate < accRate ? current : acc;
    }, data[0]);

    return parseFloat(rowData.tasa_efectiva_promedio) === parseFloat(bestRate?.tasa_efectiva_promedio);
  };





  return (
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

              <td
                className={cell.column.id === 'tasa_efectiva_promedio' && evaluateBestRate(row.original) ? 'chip-cell' : ''}
                key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                {cell.column.id === 'tasa_efectiva_promedio' && evaluateBestRate(row.original) && (
                  <span
                    className='chip'
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.5 5.25H18V4.5A1.502 1.502 0 0 0 16.5 3h-9A1.502 1.502 0 0 0 6 4.5v.75H4.5A1.502 1.502 0 0 0 3 6.75V9a3.003 3.003 0 0 0 3 3h.242a6.126 6.126 0 0 0 5.008 4.45v3.05H7.5V21h9v-1.5h-3.75v-3.052A5.975 5.975 0 0 0 17.805 12H18a3.003 3.003 0 0 0 3-3V6.75a1.502 1.502 0 0 0-1.5-1.5ZM6 10.5A1.502 1.502 0 0 1 4.5 9V6.75H6v3.75Zm10.5 0a4.5 4.5 0 0 1-4.64 4.498A4.65 4.65 0 0 1 7.5 10.28V4.5h9v6Zm3-1.5a1.502 1.502 0 0 1-1.5 1.5V6.75h1.5V9Z"></path>
                    </svg>
                    Mejor tasa
                  </span>
                )}
              </td>
            ))}
            <td
            >
              <button
                onClick={() => handleModal(row.original)}

              >Simular</button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}

export default InterestRatesTable;
