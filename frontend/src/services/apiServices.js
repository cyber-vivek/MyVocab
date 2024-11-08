import {axiosHttp, axiosHttpNL} from "../utils/Axios"

export const getWords = (pageNo, pageSize, loader, query) => {
  const url = `/word/getWords?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}`
  if(loader) {
    return axiosHttp.get(url);
    }
  return axiosHttpNL.get(url);
}

export const addWord = (payload) => {
  return axiosHttp.post('/word/add-word', payload);
}

export const login = (payload) => {
  return axiosHttp.post('/auth/login', payload);
}

export const register = (payload) => {
  return axiosHttp.post('/auth/register', payload);
}

export const getRevisionWord = () => {
  return axiosHttpNL.get('/word/revision-words');
}

export const markRevision = (payload) => {
  return axiosHttpNL.post('word/mark-revision', payload);
}

export const deleteWord = (payload) => {
  return axiosHttp.post('word/delete-word', payload);
}

export const updateWord = (payload) => {
  return axiosHttp.post('word/update-word', payload);
}