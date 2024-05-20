import { API } from "./api";

const api = new API
const endpoint = api.URI.concat("/trabajo")

const mostrarResultados = async (params) => {
  const url = endpoint.concat("/mostrar")

  return await api.getParams(url, params)
}

const mostrarDetalle = async (id) => {
  const url = endpoint.concat("/detalle/" + id)

  return await api.get(url)
}