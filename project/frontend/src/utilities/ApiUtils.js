import { API_BASE_URL, TOKEN_KEY } from './Constants';
 
const getToken = () => localStorage.getItem(TOKEN_KEY);
 
const headers = (extra = {}) => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra,
});
 
const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
};
 
export const api = {
  get: (path) =>
    fetch(`${API_BASE_URL}${path}`, { headers: headers() }).then(handleResponse),
 
  post: (path, body) =>
    fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    }).then(handleResponse),
 
  put: (path, body) =>
    fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(body),
    }).then(handleResponse),
 
  delete: (path) =>
    fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};