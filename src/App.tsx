import { useState } from 'react';
import { InterestRateData } from './Interface/Data';
import { fetchInterestRatesConsumo, fetchInterestRatesVivienda } from './path-to-api-functions';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import InterestRatesTable from './InterestRatesTable';
import ModalComponent from './ModalComponent';
import ModalInfo from './ModalInfo';

function App() {
  const [modalData, setModalData] = useState<Record<string, InterestRateData>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalHandler = () => {
    setIsModalOpen(false); // Establece el estado de cierre
    setTimeout(() => {
      setModalData({}); // Limpiar los datos después de que la animación se complete
    }, 300); // Espera el mismo tiempo que la duración de la animación
  };

  const columnsConsumo: ColumnDef<InterestRateData>[] = [
    {
      accessorKey: 'nombre_entidad',
      header: 'Banco',
    },
    {
      accessorKey: 'tipo_de_cr_dito',
      header: 'Tipo de crédito',
    },
    {
      accessorKey: 'producto_de_cr_dito',
      header: 'Producto de crédito',
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

  const { data: dataConsumo, status: statusConsumo } = useQuery({ queryKey: ['interestRatesConsumo'], queryFn: fetchInterestRatesConsumo });

  const columnsVivienda: ColumnDef<InterestRateData>[] = [
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

  const { data, status } = useQuery({ queryKey: ['interestRatesVivienda'], queryFn: fetchInterestRatesVivienda });

  return (
    <>
      <div
        className='general-container'
      >
        <div className='container-table'>
          <h1>Tasas de Interés Vivienda</h1>
          <InterestRatesTable columns={columnsVivienda} data={data} status={status} setModalData={setModalData} setIsModalOpen={setIsModalOpen} />
        </div>
        <div className='container-table'>
          <h1>Tasas de Interés Consumo</h1>
          <InterestRatesTable columns={columnsConsumo} data={dataConsumo} status={statusConsumo} setModalData={setModalData} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>

      {isModalOpen && (
        <ModalInfo data={modalData} closeModal={closeModalHandler} />
      )}
    </>
  );
}

export default App;
