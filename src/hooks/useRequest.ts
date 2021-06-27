import useSWR from "swr";
import axios from '../service/computer';

type UseRequest = (url: string) => [any,boolean];
interface CustomError extends Error {
  status?: number;
}

const useRequest: UseRequest = (url: string) => {
  const { data, error } = useSWR(url, async request => {
    const { data, status } = await axios.get(request);
    if (!data) {
      const error: CustomError = new Error('Error on get data in api');
      error.status = status;
      throw error;
    }
    return data;
  }, {
    refreshInterval: 500
  });
  return [data,error];
}

export default useRequest;