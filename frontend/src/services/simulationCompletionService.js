import api from './api';
import { syncSimulationCompletion } from '../utils/certificationProgress';


export const completeSimulationOnServer = async (simulationId, results) => {
  const response = await api.post('/simulations/complete', {
    simulationId,
    results,
  });

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to save simulation results');
  }

  return response.data.data;
};


export const syncCertificationAfterSimulation = (userId, certificationId, user) => {
  if (!userId || !certificationId || !user) return;
  syncSimulationCompletion(userId, certificationId, user);
};
