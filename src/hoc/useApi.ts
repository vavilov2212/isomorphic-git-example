import { useState } from 'react';

const useApi = <T = {}>(apiRequestFunction: any): [T, () => void] => {
  const [response, setResponse] = useState<T>({} as T);

  const fetchApi = () => {
    setResponse({} as T);

    apiRequestFunction()
    .then(setResponse)
    .catch((e: Error) => console.error('api request error', e))
  };

  return [response, fetchApi];
};

export default useApi;
