import { useState } from 'react';
import { InterestRateData } from './Interface/Data';
import { ModalData } from './Interface/Data';
import { fetchVehicleLoanInterestRates, fetchMortgageInterestRates, fetchPersonalLoanInterestRates } from './path-to-api-functions';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import InterestRatesTable from './InterestRatesTable';
import ModalInfo from './ModalInfo';
import { motion } from 'framer-motion';

function App() {
  const [modalData, setModalData] = useState<ModalData | object>({
    data: {},
    type: '',
    closeModal: () => {},
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mortgage'); // Estado para manejar la pestaña activa

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalData({});
    }, 300);
  };

  const vehicleLoanColumns: ColumnDef<InterestRateData>[] = [
    {
      accessorKey: 'nombre_entidad',
      header: 'Banco',
    },
    {
      accessorKey: 'producto_de_cr_dito',
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

  const { data: vehicleLoanData, status: vehicleLoanStatus } = useQuery({
    queryKey: ['interestRatesConsumo'],
    queryFn: fetchVehicleLoanInterestRates,
  });



  const personalLoanColumns: ColumnDef<InterestRateData>[] = [
    {
      accessorKey: 'nombre_entidad',
      header: 'Banco',
    },
    {
      accessorKey: 'producto_de_cr_dito',
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

  const { data: personalLoanData, status: personalLoanStatus } = useQuery({
    queryKey: ['interestPersonalLoanRates'],
    queryFn: fetchPersonalLoanInterestRates,
  });

  const mortgageColumns: ColumnDef<InterestRateData>[] = [
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

  const { data: mortageData, status: mortgageStatus } = useQuery({
    queryKey: ['interestRatesVivienda'],
    queryFn: fetchMortgageInterestRates,
  });


  const renderActiveTab = () => {
    switch (activeTab) {
      case 'mortgage':
        return (
          <InterestRatesTable
            columns={mortgageColumns}
            data={mortageData}
            status={mortgageStatus}
            setModalData={setModalData}
            setIsModalOpen={setIsModalOpen}
            dataType='mortgage'
          />
        );
      case 'vehicle':
        return (
          <InterestRatesTable
            columns={vehicleLoanColumns}
            data={vehicleLoanData}
            status={vehicleLoanStatus}
            setModalData={setModalData}
            setIsModalOpen={setIsModalOpen}
            dataType='vehicle'
          />
        );
      case 'personalLoan':
        return (
          <InterestRatesTable
            columns={personalLoanColumns}
            data={personalLoanData}
            status={personalLoanStatus}
            setModalData={setModalData}
            setIsModalOpen={setIsModalOpen}
            dataType='personal'
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'mortgage' ? 'active' : ''}`}
          onClick={() => setActiveTab('mortgage')}
        >
          Tasas de Vivienda
        </button>
        <button
          className={`tab-button ${activeTab === 'vehicle' ? 'active' : ''}`}
          onClick={() => setActiveTab('vehicle')}
        >
          Tasas de Vehículo
        </button>
        <button
          className={`tab-button ${activeTab === 'personalLoan' ? 'active' : ''}`}
          onClick={() => setActiveTab('personalLoan')}
        >
          Tasas de Libre Inversión
        </button>
      </div>

      <motion.div
        className='content-container'
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {renderActiveTab()}
      </motion.div>

      {isModalOpen && <ModalInfo data={modalData} closeModal={closeModalHandler} />}
    </>
  );
}

export default App;
