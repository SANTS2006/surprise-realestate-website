import { API_URL } from '../config/env.js';

// No cookies/session here — this is the public, unauthenticated API (see
// server/src/routes/v1/public.routes.js). A plain fetch wrapper is enough;
// no need for the credentialed axios client the authenticated portal uses.
const TIMEOUT_MS = 30_000;
const READ_RETRIES = 2;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, { method = 'GET', params, body } = {}, attempt = 0) {
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    // The server could not be reached in time (it may be waking up). Reads are
    // retried quietly; a send (like an inquiry) is not, so it is never doubled.
    if (method === 'GET' && attempt < READ_RETRIES) {
      await sleep(1500 * (attempt + 1));
      return request(path, { method, params, body }, attempt + 1);
    }
    throw new Error(err.name === 'AbortError'
      ? 'This is taking longer than usual. Please wait a moment and try again.'
      : 'We could not reach the server. Please check your internet connection and try again.');
  } finally {
    clearTimeout(timer);
  }

  if (method === 'GET' && [502, 503, 504].includes(res.status) && attempt < READ_RETRIES) {
    await sleep(1500 * (attempt + 1));
    return request(path, { method, params, body }, attempt + 1);
  }

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
