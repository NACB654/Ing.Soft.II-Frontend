import { API } from "./api";

const api = new API();
const endpoint = api.URI.concat("/subarea")

const getAreasYSubareas = async () => {
  const url = endpoint.concat("/info")

  return await api.get(url)
}

const areasAPI = { getAreasYSubareas }

export default areasAPI;