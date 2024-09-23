import axios from "axios";
import { InterestRateData } from "./Interface/Data";

const fetchInterestRates = async (url: string): Promise<InterestRateData[]> => {
  const { data } = await axios.get(url);
  return data;
};

export default fetchInterestRates;