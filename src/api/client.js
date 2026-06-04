const BASE = import.meta.env.VITE_API_URL ?? "/api";

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error ?? `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }

  return data;
}

export const api = {
  get:    (path)         => request(path),
  post:   (path, body)   => request(path, { method: "POST",   body }),
  put:    (path, body)   => request(path, { method: "PUT",    body }),
  patch:  (path, body)   => request(path, { method: "PATCH",  body }),
  delete: (path)         => request(path, { method: "DELETE" }),
};
