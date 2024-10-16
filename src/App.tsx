import { useState } from 'react';
import { InterestRateData } from './Interface/Data';
import { ModalData } from './Interface/Data';
import { fetchVehicleLoanInterestRates, fetchMortgageInterestRates, fetchPersonalLoanInterestRates } from './path-to-api-functions';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import InterestRatesTable from './InterestRatesTable';
import ModalInfo from './ModalInfo';
import { motion } from 'framer-motion';
import Faq from './faq';

type FaqItem = {
  title: string;
  content: React.ReactNode;
  isCollapsed: boolean;
};

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


  const [dataFaq, setDataFaq] = useState<FaqItem[]>([
    {
      title: 'Tasa de interés nominal',
      content: (
        <div>
          <p>Es el porcentaje que cobra el banco o entidad financiera por prestar dinero, sin tener en cuenta otros costos asociados. Dependiendo de la entidad y del tipo de crédito, puede ser fija o variable.</p>
          <ul>
            <li><strong>Fija:</strong> La tasa no cambia durante la vida del crédito, lo que da más estabilidad.</li>
            <li><strong>Variable:</strong> La tasa puede cambiar dependiendo de factores del mercado, lo que puede aumentar o reducir el costo del crédito.</li>
          </ul>
        </div>
      ),
      isCollapsed: false,
    },
    {
      title: 'Tasa efectiva anual (TEA)',
      content: (
        <p>Es una tasa que refleja el costo real de un préstamo, ya que incluye tanto los intereses como otros costos adicionales (comisiones, seguros, etc.). Es el indicador clave que permite comparar entre varias opciones de crédito. El simulador te muestra cómo diferentes TEA afectan el costo total.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Monto del préstamo',
      content: (
        <p>Es la cantidad de dinero que solicitas. Un simulador te permite ajustar este valor para ver cómo cambia la cuota mensual según el monto que decidas pedir prestado.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Plazo del crédito',
      content: (
        <div>
          <p>Es el tiempo que tienes para pagar el crédito. Puede variar desde meses hasta varios años. Los simuladores te permiten cambiar el plazo para ver cómo esto afecta el valor de las cuotas y el total de intereses pagados.</p>
          <ul>
            <li><strong>Plazos largos:</strong> Disminuyen la cuota mensual, pero aumentan el total de intereses pagados.</li>
            <li><strong>Plazos cortos:</strong> Aumentan la cuota mensual, pero reducen los intereses totales.</li>
          </ul>
        </div>
      ),
      isCollapsed: false,
    },
    {
      title: 'Cuota mensual',
      content: (
        <p>Es el monto que debes pagar cada mes. Los simuladores muestran cómo varía la cuota mensual dependiendo de la tasa de interés, el plazo y el monto del préstamo.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Amortización',
      content: (
        <div>
          <p>Es el proceso mediante el cual se paga el préstamo. Los simuladores suelen mostrar tablas de amortización que desglosan cuánto de cada cuota se destina a pagar intereses y cuánto a reducir el capital.</p>
          <ul>
            <li><strong>Amortización constante:</strong> En este caso, el capital se amortiza de manera uniforme y los intereses van disminuyendo a medida que se reduce la deuda.</li>
            <li><strong>Cuota fija:</strong> Las cuotas se mantienen iguales, pero al inicio se paga más en intereses y menos en capital.</li>
          </ul>
        </div>
      ),
      isCollapsed: false,
    },
    {
      title: 'Capacidad de pago',
      content: (
        <p>Es fundamental saber si podrás asumir la cuota mensual del crédito. Un simulador ayuda a calcular la cuota y compararla con tus ingresos, lo que te da una idea clara de si es viable o no. Lo recomendable es no destinar más del 30% de tus ingresos a deudas.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Costos adicionales',
      content: (
        <p>Además de los intereses, un crédito puede tener otros costos como comisiones de apertura, seguros obligatorios o costos administrativos. Algunos simuladores te permiten incluir estos factores para calcular el costo total real del crédito.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Relación entre tasa y riesgo',
      content: (
        <p>Los simuladores también pueden mostrar cómo los niveles de riesgo del prestatario afectan la tasa de interés. Si tienes un buen historial crediticio y una alta calificación, es probable que te ofrezcan tasas más bajas.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Tasa de interés efectiva mensual (TEM)',
      content: (
        <p>A diferencia de la TEA, la TEM refleja el costo del préstamo mes a mes. Es útil para entender cómo cada mes se acumulan los intereses.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Total a pagar',
      content: (
        <p>Un simulador siempre muestra el monto total que pagarás al final del crédito, lo que incluye el capital más los intereses y costos adicionales. Esto te da una visión clara del costo real del préstamo.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Comparación de ofertas',
      content: (
        <p>Los simuladores permiten comparar diferentes propuestas de crédito de varios bancos o entidades. Al variar las tasas de interés, plazos y montos, puedes ver cuál es la opción más económica y responsable.</p>
      ),
      isCollapsed: false,
    },
    {
      title: 'Decisiones financieras responsables',
      content: (
        <div>
          <ul>
            <li><strong>Entender todos los costos:</strong> No solo te fijes en la tasa de interés nominal, asegúrate de considerar la TEA, los plazos y los costos adicionales.</li>
            <li><strong>Simular diferentes escenarios:</strong> Cambia los valores de plazo, monto y tasa para entender cómo afectan las cuotas y el costo total.</li>
            <li><strong>Ajustar el crédito a tu capacidad de pago:</strong> No asumas una deuda que represente más de lo que puedes pagar mensualmente.</li>
            <li><strong>Comparar:</strong> Usa el simulador para comparar entre distintas entidades financieras y optar por la opción más favorable para ti.</li>
          </ul>
          <p>Con un simulador de tasas crediticias, puedes tener un panorama claro y completo de tu préstamo antes de tomar cualquier decisión, lo cual es fundamental para manejar tus finanzas de manera responsable.</p>
        </div>
      ),
      isCollapsed: false,
    },
  ]);

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
      case 'concepts':
        return(
          <Faq 
            data={dataFaq}
            setData={setDataFaq}
          />
        )
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
        <button
          className={`tab-button ${activeTab === 'concepts' ? 'active' : ''}`}
          onClick={() => setActiveTab('concepts')}
        >
          Conceptos
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
