import axios from 'axios';
import { DATOS_GOV_BASE_URL } from '../config/datosGovEnv';
import { DomainError } from '@/domain/errors/DomainError';

export const datosGovClient = axios.create({
  baseURL: `${DATOS_GOV_BASE_URL}/resource`,
  timeout: 8000,
});

datosGovClient.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
      return Promise.reject(new DomainError('Datos.gov.co no respondió a tiempo. Intenta de nuevo.'));
    }
    if (err.response?.status === 429) {
      return Promise.reject(new DomainError('Demasiadas consultas. Intenta en unos segundos.'));
    }
    const message: string =
      err.response?.data?.message ?? err.message ?? 'Error al consultar datos.gov.co';
    return Promise.reject(new DomainError(message));
  },
);
