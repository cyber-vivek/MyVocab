import {axiosHttp, axiosHttpNL} from "../utils/Axios"

export const getWords = (pageNo, pageSize, loader) => {
  const url = `/word/getWords?pageNo=${pageNo}&pageSize=${pageSize}`
  if(loader) {
    return axiosHttp.get(url);
    }
  return axiosHttpNL.get(url);
}

export const addWord = (payload) => {
  return axiosHttp.post('/word/add-word', payload);
}