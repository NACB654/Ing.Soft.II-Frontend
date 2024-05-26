import { API } from "./api";

const api = new API();
const endpoint = api.URI.concat("/periodo")

const getPeriodos = async () => {
  const url = endpoint.concat("/info")

  return await api.get(url)
}

const periodoAPI = { getPeriodos }

export default periodoAPI;