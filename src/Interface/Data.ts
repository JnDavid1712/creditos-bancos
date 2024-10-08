export interface InterestRateData {
    nombre_entidad: string;
    tipo_de_cr_dito: string;
    tasa_efectiva_promedio: string; // Supongo que es un número, ajusta si es necesario
    producto_de_cr_dito?: string;
  }

  export interface ModalData {
    data: InterestRateData;
    type: string;
    closeModal: () => void;
  }

  export interface FormData {
    amount: number;
    term: number;
  }

  export interface SimulationData {
    month: number;
    date: string;
    remainingAmount: string;
    payment: string;
    capital: string;
    interest: string;
    finalAmount: string;
  }

  export interface SimulationSummary{
    mensualInterest: string;
    paymentPerMonth: string;
    totalInterest: string;
    totalValue: string;
  }