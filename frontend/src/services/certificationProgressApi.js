import api from './api';

export const fetchAllCertificationProgress = async () => {
  const response = await api.get('/certifications/progress');
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to load certification progress');
  }
  return response.data.data.progress || [];
};

export const fetchCertificationProgress = async (certificationId) => {
  const response = await api.get(`/certifications/${certificationId}/progress`);
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to load certification progress');
  }
  return response.data.data.progress;
};

export const completeCertificationActivity = async (certificationId, activityId) => {
  const response = await api.post(
    `/certifications/${certificationId}/activities/${activityId}/complete`
  );
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to save certification progress');
  }
  return response.data.data;
};
