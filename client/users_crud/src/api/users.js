// src/api/users.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

/**
 * Obtiene usuarios con paginado, filtro de estado y búsqueda.
 * @param {{ limit: number, offset: number, status?: string, search?: string }} params
 * @returns {Promise<{ data: Array, total: number }>}
 */
export async function getUsers({ limit, offset, status, search }) {
  let url = `${BASE_URL}/users?_limit=${limit}&_start=${offset}`;
  if (status) url += `&status=${encodeURIComponent(status)}`;
  if (search) url += `&q=${encodeURIComponent(search)}`;

  const res = await fetch(url);
  const data = await res.json();
  // json-server devuelve el total en esta cabecera
  const total = parseInt(res.headers.get("X-Total-Count") || data.length, 10);

  // Simular latencia de 500ms
  return new Promise(resolve =>
    setTimeout(() => resolve({ data, total }), 500)
  );
}

/**
 * Crea un nuevo usuario.
 * @param {Object} user
 * @returns {Promise<Object>}
 */
export async function createUser(user) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return new Promise(resolve => setTimeout(() => resolve(data), 500));
}

/**
 * Actualiza un usuario existente.
 * @param {number|string} id
 * @param {Object} user
 * @returns {Promise<Object>}
 */
export async function updateUser(id, user) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return new Promise(resolve => setTimeout(() => resolve(data), 500));
}

/**
 * Elimina un usuario por ID.
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export async function deleteUser(id) {
  await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
  return new Promise(resolve => setTimeout(resolve, 500));
}
