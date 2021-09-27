import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

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

function putEditPost(postId, body, config) {
  const promise = axios.put(`${BASE_URL}/posts/${postId}`, body, config);
  return promise;
}

function deleteDeletePost(postId, config) {
  const promise = axios.delete(`${BASE_URL}/posts/${postId}`, config);
  return promise;
}

function getHashtagTrending(config) {
  const promisse = axios.get(`${BASE_URL}/hashtags/trending`, config);
  return promisse;
}

function getPostsSomeUser(id, config) {
  return axios.get(`${BASE_URL}/users/${id}/posts`, config);
}

function getPostsLiked(config) {
  return axios.get(`${BASE_URL}/posts/liked`, config);
}

function getHashtagPost(hashtag, config) {
  return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts`, config);
}

function postLikeDislike(type, id, config) {
  return axios.post(`${BASE_URL}/posts/${id}/${type}`, {}, config);
}

function followUser(userId, config) {
  return axios.post(`${BASE_URL}/users/${userId}/follow`, {}, config);
}

function unfollowUser(userId, config) {
  return axios.post(`${BASE_URL}/users/${userId}/unfollow`, {}, config);
}

function getUsersThatIFollow(config) {
  return axios.get(`${BASE_URL}/users/follows`, config);
}

function getPostsFromUsersThatIFollow(config) {
  return axios.get(`${BASE_URL}/following/posts`, config);
}

function postRepost(postId, config) {
  const promise = axios.post(`${BASE_URL}/posts/${postId}/share`, "", config);
  return promise;
}

function getSearchUser(searchName, config) {
  const promise = axios.get(
    `${BASE_URL}/users/search?username=${searchName}`,
    config
  );
  return promise;
}

function getUserInformation(id, config) {
  return axios.get(`${BASE_URL}/users/${id}`, config);
}

function getComments(postId, config) {
  return axios.get(`${BASE_URL}/posts/${postId}/comments`, config);
}

function postComment(postId, body, config) {
  return axios.post(`${BASE_URL}/posts/${postId}/comment`, body, config);
}

export {
  postLogin,
  postSignUp,
  getPostsList,
  postCreatePost,
  putEditPost,
  deleteDeletePost,
  getHashtagTrending,
  getPostsSomeUser,
  getPostsLiked,
  getHashtagPost,
  postLikeDislike,
  followUser,
  unfollowUser,
  getUsersThatIFollow,
  getPostsFromUsersThatIFollow,
  postRepost,
  getSearchUser,
  getUserInformation,
  getComments,
  postComment,
};
