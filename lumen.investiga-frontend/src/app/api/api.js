import axios from "axios"

export class API {
  URI = "http://localhost:3001";

  constructor() {}

  async get(endpoint) {
    try {
      return await axios.get(endpoint);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getParams(endpoint, params) {
    try {
      return await axios.get(endpoint, {
        params: params,
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async post(endpoint, payload) {
    try {
      return await axios.post(endpoint, payload);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async postFormData(endpoint, payload) {
    try {
      return await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async put(endpoint, payload) {
    try {
      return await axios.put(endpoint, payload);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async remove(endpoint) {
    try {
      return await axios.delete(endpoint);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}