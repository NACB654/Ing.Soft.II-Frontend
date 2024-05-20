import { API } from "./api";

const api = new API
const endpoint = api.URI.concat("/profesor")

const subirTrabajo = async (payload) => {
  const url = endpoint.concat("/subir")

  return await api.post(url, payload)
}

const profesorAPI = { subirTrabajo }

export default profesorAPI