import { API } from "./api";

const api = new API;
const endpoint = api.URI.concat("/usuario");

const iniciarSesion = async (payload) => {
  const url = endpoint.concat("/inicio")

  return await api.post(url, payload);
}

const modificarDatos = async (payload) => {
  const url = endpoint.concat("/modificar")

  return await api.put(url, payload);
}

const registrarUsaurio = async (payload) => {
  const url = endpoint.concat("/registro")

  return await api.post(url, payload);
}

const getUser = async (id) => {
  const url = endpoint.concat("/data/" + id)

  return await api.get(url)
}

const subirFoto = async (payload) => {
  const url = endpoint.concat("/foto")

  return await api.postFormData(url, payload)
}

const guardarTrabajo = async (payload) => {
  const url = endpoint.concat("/guardar")

  return await api.post(url, payload)
}

const eliminarTrabajo = async (userId, trabajoId) => {
  const url = endpoint.concat("/eliminar");
  const params = { userId, trabajoId };
  
  return await api.getParams(url, params);
}

const cambiarPassword = async (payload) => {
  const url = endpoint.concat("/password")

  return await api.put(url, payload);
}

const usuarioAPI = { iniciarSesion, registrarUsaurio, getUser, guardarTrabajo, eliminarTrabajo, modificarDatos, subirFoto, cambiarPassword }


export default usuarioAPI