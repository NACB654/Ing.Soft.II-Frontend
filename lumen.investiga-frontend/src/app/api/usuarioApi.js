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

const getUser = async (id) => {
  const url = endpoint.concat("/data/" + id)

  return await api.get(url)
}

const guardarTrabajo = async (payload) => {
  const url = endpoint.concat("/guardar")

  return await api.post(url, payload)
}

const eliminarTrabajo = async (userId, trabajoId) => {
  const url = `${endpoint}/eliminar`;
  const params = { userId, trabajoId };
  return await api.getParams(url, params);
}

const usuarioAPI = { iniciarSesion, registrarUsaurio, getUser, guardarTrabajo, eliminarTrabajo }

export default usuarioAPI