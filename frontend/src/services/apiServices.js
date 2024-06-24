import axiosHttp from "../utils/Axios"

export const getWords = (pageNo, pageSize) => {
  const url = `/word/getWords?page=${pageNo}&pageSize=${pageSize}`
  return axiosHttp.get(url);
}

export const addWord = (payload) => {
  return axiosHttp.post('/word/add-word', payload);
}