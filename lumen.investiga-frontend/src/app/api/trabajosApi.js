import { API } from "./api";

const api = new API
const endpoint = api.URI.concat("/trabajo")

const getTrabajos = async (profe) => {
  const url = endpoint.concat("/subidos/" + profe)

  return await api.get(url)
}

const mostrarResultados = async (params) => {
  const url = endpoint.concat("/mostrar")
  console.log(params)
  return await api.getParams(url, params)
}

const mostrarDetalle = async (id) => {
  const url = endpoint.concat("/detalle/" + id)

  return await api.get(url)
}

const trabajosAPI = { getTrabajos, mostrarResultados, mostrarDetalle }

export default trabajosAPI;