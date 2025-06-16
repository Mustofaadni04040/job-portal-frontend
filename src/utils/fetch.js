import axios from "axios";

export async function getData(url, params, token) {
  return await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}${url}`, {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function postData(url, payload, formData, token) {
  return await axios.post(
    `${import.meta.env.VITE_JOB_API_END_POINT}${url}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          formData === "multipart" ? "multipart/form-data" : "application/json",
      },
    }
  );
}

export async function putData(url, payload, token) {
  return await axios.put(
    `${import.meta.env.VITE_JOB_API_END_POINT}${url}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deleteData(url, token) {
  return await axios.delete(`${import.meta.env.VITE_JOB_API_END_POINT}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
