import { API } from "./api";

const api = new API();
const endpoint = api.URI.concat("/comentario")

const getComentarios = async (id) => {
    const url = endpoint.concat("/info/" + id)
    return await api.get(url)
}

const crearComentario = async (payload) => {
    const url = endpoint.concat("/crear")
    return await api.post(url, payload)
}

const cometarioAPI = { getComentarios, crearComentario }

export default cometarioAPI