import { API_URL } from '../config/env.js';

// No cookies/session here — this is the public, unauthenticated API (see
// server/src/routes/v1/public.routes.js). A plain fetch wrapper is enough;
// no need for the credentialed axios client the authenticated portal uses.
async function request(path, { method = 'GET', params, body } = {}) {
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok || !payload?.success) {
    const message = payload?.error?.message || 'Something went wrong. Please try again.';
    const details = payload?.error?.details;
    throw new Error(details?.map((d) => d.message).join(' ') || message);
  }
  return payload;
}

export const apiClient = {
  get: (path, params) => request(path, { params }),
  post: (path, body) => request(path, { method: 'POST', body }),
};
