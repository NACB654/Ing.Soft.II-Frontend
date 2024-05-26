import { API } from "./api";

const api = new API();
const endpoint = api.URI.concat("/curso")

const getCursos = async () => {
  const url = endpoint.concat("/info")

  return await api.get(url)
}

const cursoAPI = { getCursos }

export default cursoAPI;