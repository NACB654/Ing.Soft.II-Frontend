import { API } from "./api";

const api = new API();
const endpoint = api.URI.concat("/valoracion")

const valorarTrabajo = async (payload) => {
  const url = endpoint.concat("/valorar")

  return await api.post(url, payload)
}

const ratingAPI = { valorarTrabajo }

export default ratingAPI