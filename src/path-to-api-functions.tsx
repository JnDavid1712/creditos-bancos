import axios from 'axios';

const fetchVehicleLoanInterestRates = async () => {
  const { data } = await axios.get(
    'https://www.datos.gov.co/resource/w9zh-vetq.json?$query=SELECT%20nombre_entidad%2C%20tipo_de_cr_dito%2C%20producto_de_cr_dito%2C%20AVG(tasa_efectiva_promedio)%20AS%20tasa_efectiva_promedio%20WHERE%20caseless_one_of(nombre_entidad%2C%20%22Bancolombia%22%2C%20%22Banco%20de%20Bogot%C3%A1%22%2C%20%22Banco%20Davivienda%22%2C%20%22BBVA%20Colombia%22%2C%20%22AV%20Villas%22%2C%20%22Banco%20Caja%20Social%20S.A.%22%2C%20%22Banco%20Popular%22%2C%20%22Banco%20Falabella%20S.A.%22%2C%20%22Banco%20Mundo%20Mujer%20S.A.%22%2C%20%22Banco%20W%20S.A.%22%2C%20%22Bancam%C3%ADa%20S.A.%22%2C%20%22Banco%20de%20Occidente%22)%20AND%20tipo_de_cr_dito%3D%27Consumo%27%20AND%20producto_de_cr_dito%3D%27Veh%C3%ADculo%27%20GROUP%20BY%20nombre_entidad%2C%20tipo_de_cr_dito%2C%20producto_de_cr_dito%20ORDER%20BY%20nombre_entidad%2C%20producto_de_cr_dito'
  );
  return data;
};

const fetchPersonalLoanInterestRates = async () => {
  const { data } = await axios.get(
    'https://www.datos.gov.co/resource/w9zh-vetq.json?$query=SELECT%20nombre_entidad%2C%20tipo_de_cr_dito%2C%20producto_de_cr_dito%2C%20AVG(tasa_efectiva_promedio)%20AS%20tasa_efectiva_promedio%20WHERE%20caseless_one_of(nombre_entidad%2C%20%22Bancolombia%22%2C%20%22Banco%20de%20Bogot%C3%A1%22%2C%20%22Banco%20Davivienda%22%2C%20%22BBVA%20Colombia%22%2C%20%22AV%20Villas%22%2C%20%22Banco%20Caja%20Social%20S.A.%22%2C%20%22Banco%20Popular%22%2C%20%22Banco%20Falabella%20S.A.%22%2C%20%22Banco%20Mundo%20Mujer%20S.A.%22%2C%20%22Banco%20W%20S.A.%22%2C%20%22Bancam%C3%ADa%20S.A.%22%2C%20%22Banco%20de%20Occidente%22)%20AND%20tipo_de_cr_dito%3D%27Consumo%27%20AND%20producto_de_cr_dito%3D%27Libre%20inversi%C3%B3n%27%20GROUP%20BY%20nombre_entidad%2C%20tipo_de_cr_dito%2C%20producto_de_cr_dito%20ORDER%20BY%20nombre_entidad%2C%20producto_de_cr_dito'
  );
  return data;
};


const fetchMortgageInterestRates = async () => {
  const { data } = await axios.get(
    'https://www.datos.gov.co/resource/w9zh-vetq.json?$query=SELECT%20nombre_entidad%2C%20tipo_de_cr_dito%2C%20AVG(tasa_efectiva_promedio)%20AS%20tasa_efectiva_promedio%20WHERE%20caseless_one_of(nombre_entidad%2C%20%22Bancolombia%22%2C%20%22Banco%20de%20Bogot%C3%A1%22%2C%20%22Banco%20Davivienda%22%2C%20%22BBVA%20Colombia%22%2C%20%22AV%20Villas%22%2C%20%22Banco%20Caja%20Social%20S.A.%22%2C%20%22Banco%20Popular%22%2C%20%22Banco%20Falabella%20S.A.%22%2C%20%22Banco%20Mundo%20Mujer%20S.A.%22%2C%20%22Banco%20W%20S.A.%22%2C%20%22Bancam%C3%ADa%20S.A.%22%2C%20%22Banco%20de%20Occidente%22)%20AND%20tipo_de_cr_dito%3D%27Vivienda%27%20GROUP%20BY%20nombre_entidad%2C%20tipo_de_cr_dito%20ORDER%20BY%20nombre_entidad'
  );
  return data;
};


export { fetchVehicleLoanInterestRates, fetchPersonalLoanInterestRates, fetchMortgageInterestRates };
