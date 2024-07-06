import { API } from "./api";

const api = new API
const endpoint = api.URI.concat("/trabajo")

const getTrabajos = async (profe) => {
  const url = endpoint.concat("/subidos/" + profe)

  return await api.get(url)
}

const getTrabajosGuardados = async (id) => {
  const url = endpoint.concat("/guardados/" + id)

  return api.get(url)
}

const mostrarResultados = async (params) => {
  const url = endpoint.concat("/mostrar")
  return await api.getParams(url, params)
}

const mostrarDetalle = async (id) => {
  const url = endpoint.concat("/detalle/" + id)

  return await api.get(url)
}

const filtrarResultados = async (payload) => {
  const url = endpoint.concat("/filtrar")

  return await api.post(url, payload)
}

const visualizarTotales = async () => {
  const url = endpoint.concat("/totales")

  return await api.get(url);
}

const trabajosAPI = { getTrabajos, mostrarResultados, mostrarDetalle, filtrarResultados, getTrabajosGuardados, visualizarTotales }

export default trabajosAPI;