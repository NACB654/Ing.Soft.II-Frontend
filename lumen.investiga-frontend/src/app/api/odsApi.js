import { API } from "./api";

const api = new API
const endpoint = api.URI.concat("/ods")

const getODS = async () => {
  const url = endpoint.concat("/info")

  return await api.get(url)
}

const odsAPI = { getODS }

export default odsAPI