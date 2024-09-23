import React from 'react';
import InterestRatesTableVivienda from './InterestRatesTableVivienda';
import InterestRatesTableConsumo from './InterestRatesTableConsumo';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: '20px',
      }}
    >
      <div>
        <h1>Tasas de Interés Vivienda</h1>
        <InterestRatesTableVivienda />
      </div>
      <div>
        <h1>Tasas de Interés Consumo</h1>
        <InterestRatesTableConsumo />
      </div>
    </div>
  );
}

export default App;
