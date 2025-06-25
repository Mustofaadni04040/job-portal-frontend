import axios from "axios";

export async function getData(url, params, token, withCredentials) {
  return await axios.get(`${url}`, {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: withCredentials ? true : false,
  });
}

export async function postData(url, payload, formData, withCredentials, token) {
  return await axios.post(`${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":
        formData === "multipart" ? "multipart/form-data" : "application/json",
    },
    withCredentials: withCredentials ? true : false,
  });
}

export async function putData(url, payload, token, withCredentials) {
  console.log(payload);
  return await axios.put(`${url}`, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: withCredentials ? true : false,
  });
}

export async function deleteData(url, token) {
  return await axios.delete(`${import.meta.env.VITE_JOB_API_END_POINT}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
