import { API } from "./api";

const api = new API;
const endpoint = api.URI.concat("/usuario");

const iniciarSesion = async (payload) => {
  const url = endpoint.concat("/inicio")

  return await api.post(url, payload);
}

const registrarUsaurio = async (payload) => {
  const url = endpoint.concat("/registro")

  return await api.post(url, payload);
}

const usuarioAPI = { iniciarSesion, registrarUsaurio}

export default usuarioAPI