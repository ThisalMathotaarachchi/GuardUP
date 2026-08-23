import api from './api';

export const fetchAllQuizResults = async () => {
  const response = await api.get('/quizzes/results');
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to load quiz results');
  }
  return response.data.data.results || {};
};

export const fetchQuizResult = async (quizId) => {
  const response = await api.get(`/quizzes/${quizId}/result`);
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to load quiz result');
  }
  return response.data.data.result;
};

export const saveQuizAttempt = async (quizId, result) => {
  const response = await api.post(`/quizzes/${quizId}/attempt`, result);
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to save quiz attempt');
  }
  return response.data.data.result;
};
