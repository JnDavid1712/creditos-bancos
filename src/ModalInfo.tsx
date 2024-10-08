import { useRef, useState } from 'react';
import { ModalData, SimulationSummary } from './Interface/Data';
import './ModalInfo.css';
import { motion } from 'framer-motion';
import ModalTable from './ModalTable';


function ModalInfo({
  data,
  closeModal,
}: {
  data: ModalData | object;
  closeModal: () => void;
}) {


  const amountRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLInputElement>(null);

  const [showTable, setShowTable] = useState(false);
  const [simulationSummary, setSimulationSummary] = useState<SimulationSummary | null>(null);

  if (!data) return null;
  let title = "";

  if (typeof data === 'object' && 'type' in data) {
    switch (data.type) {
      case 'vehicle':
        title = 'crédito de vehículo';
        break;
      case 'personal':
        title = 'crédito personal';
        break;
      case 'mortgage':
        title = 'crédito de vivienda';
        break;
      default:
        title = 'Información';
    }
  }




  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/\D/g, ''));
    if (amountRef.current) {
      amountRef.current.value = value.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = Number(amountRef.current?.value.replace(/\D/g, ''));
    const term = Number(termRef.current?.value);
    if (amount > 0 && term > 0) {
      setShowTable(true);
    }
  };

  return (
    <div onClick={() => closeModal()} id="modal" className="modal-backdrop">
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="close-button" id="closeModal" onClick={() => closeModal()}>
          <svg width="26" height="26" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
        </span>
        <h2>Simular {title}</h2>
        <form onSubmit={handleSubmit} className="loan-form">
          <div className='info-container'>
            <div className='general-info-container'>
              <h3>Información general </h3>
              <div className='input-group'>
                <label htmlFor="amount">Banco</label>
                <p>{data.data.nombre_entidad}</p>
              </div>
              <div className='input-group'>
                <label htmlFor="amount">Tasa EA</label>
                <p>{parseFloat(data.data.tasa_efectiva_promedio).toFixed(2)}%</p>
              </div>


              <div className='input-group'>
                <label htmlFor="amount">Monto</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  ref={amountRef}
                  onChange={handleChangeAmount}
                  required
                  min="1"
                />
              </div>

              <div className='input-group'>
                <label htmlFor="term">Número de cuotas</label>
                <input
                  type="number"
                  id="term"
                  name="term"
                  ref={termRef}
                  required
                  min="1"
                  max="240"
                />

              </div>
            </div>
            {simulationSummary && (
              <div className='summary-container'>
                <h3>Resumen de la simulación</h3>
                <div className='summary-column'>
                  <span>Tasa mensual</span>
                  <p>{simulationSummary.mensualInterest}</p>
                </div>
                <div className='summary-column'>
                  <span>Pago mensual</span>
                  <p>{simulationSummary.paymentPerMonth}</p>
                </div>
                <div className='summary-column'>
                  <span>Interés total</span>
                  <p>{simulationSummary.totalInterest}</p>
                </div>

                <div className='summary-column'>
                  <span>Valor total</span>
                  <p>{simulationSummary.totalValue}</p>
                </div>

              </div>
            )}
          </div>


          {!showTable && (

            <button
              className='action-button'
              type="submit">Simular</button>

          )}
        </form>

        <div className='table-container'>
          {showTable && (
            <ModalTable
              dataToSimulate={data}
              formData={{ amount: Number(amountRef.current?.value.replace(/\D/g, '')), term: Number(termRef.current?.value) }}
              setSimulationSummary={setSimulationSummary}
            />
          )}
        </div>

      </motion.div>
    </div>
  );
}

export default ModalInfo;
