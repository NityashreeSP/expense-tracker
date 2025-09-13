// frontend/src/services/api.js
export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function apiFetch(path, { method='GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if(token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.msg || JSON.stringify(data));
  return data;
}
