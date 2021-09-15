import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

function postSignUp(body) {
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise;
}

function postLogin(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}

function getPostsList(config) {
  const promise = axios.get(`${BASE_URL}/posts`, config);
  return promise;
}

function postCreatePost(body, config) {
  const promise = axios.post(`${BASE_URL}/posts`, body, config);
  return promise;
}

export { postLogin, postSignUp, getPostsList, postCreatePost };
