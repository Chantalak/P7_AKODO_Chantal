import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

const axios = require('axios');
const instance = axios.create();
instance.defaults.baseURL = 'http://localhost:3000/api';
instance.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  if (config) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
})

instance.interceptors.response.use((config) => {
  let token = localStorage.getItem('token')
  if (config) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
})

Vue.use(Vuex);

export default new Vuex.Store({
  //données dont dépendent les components
  state: {
    status: '',
    user: {}, 
    currentUser: {}, 
    users: [],
    posts: [],
    post: {},
    article: {},
    comments: [],
    comment: {}
  },
  getters: {
    token: (state) => !!state.user.token,
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status;
    },
    LOG_USER(state, user) { 
      window.localStorage.user = JSON.stringify(user);
      state.user = user;
    },
    DATA_USER(getters, currentUser) {
      window.localStorage.currentUser = JSON.stringify(currentUser);
      getters.currentUser = currentUser;
    },
    ALL_POSTS(state, posts){
      state.posts = posts;
    },
    POST_ARTICLE(state, article) {
      window.localStorage.article = JSON.stringify(article);
      state.article = article;
    },
    GET_POST(state, post){
      window.localStorage.post = JSON.stringify(post);
      state.post = post;
    },
    ALL_COMMENTS(state, comments){
      state.comments = comments;
    },
    POST_COMMENT(state, comment) {
      state.comment = comment;
    },
  },
  actions: {
    //users
    //commit permet d'éxécuter la mutation de quand on a créé le compte
    signup({commit}, userDatas) {
      commit('SET_STATUS', 'loading'),
      instance.post('/users/signup', userDatas)
      .then((response) => {
        commit('SET_STATUS', 'created');
        console.log(response);
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    login({commit}, userDatas) {
      commit('SET_STATUS', 'loading'),
      instance.post('/users/login', userDatas)
      .then((response) => {
        commit('SET_STATUS', '');
        localStorage.setItem('token', response.data.token);
        commit('LOG_USER', response.data);
        console.log(response);
      })
      .catch((error) => {
        commit('SET_STATUS', 'error');
        console.log(error);
      })
    },
    profil({commit}) {
      commit('SET_STATUS', 'loading'),
      instance.get('/users/profil')
      .then((response) => {
        localStorage.setItem('currentUser', response.data);
        commit( 'DATA_USER', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    deleteUser({commit}) {
      commit('SET_STATUS', 'loading'),
			instance.delete('/users/delete')
			.then((response)=> {
        commit('SET_STATUS', '');
				console.log(response);
			})
			.catch(() => { 
				commit('SET_STATUS', 'error');
			})
		},
    //posts
    getAll({commit} , postDatas) {
      commit('SET_STATUS', 'loading'),
      instance.get('/posts/', postDatas)
      .then((response) => {
        commit( 'ALL_POSTS', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    create({commit}, postDatas) {
      commit('SET_STATUS', 'loading'),
      instance.post('/posts/create', postDatas)
      .then((response) => {
        commit('SET_STATUS', '');
        commit( 'POST_ARTICLE', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    //comments 
    getAllComments({commit}, commentDatas) {
      commit('SET_STATUS', 'loading'),
      instance.get('/comments/', commentDatas)
      .then((response) => {
        commit( 'ALL_COMMENTS', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    createComment({commit}, commentDatas) {
      commit('SET_STATUS', 'loading'),
      instance.post('/commments/create', commentDatas)
      .then((response) => {
        commit('SET_STATUS', '');
        commit( 'POST_COMMENT', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    deleteComment({commit}) {
      commit('SET_STATUS', 'loading'),
			instance.delete('/comments/delete')
			.then((response)=> {
        commit('SET_STATUS', '');
				console.log(response);
			})
			.catch(() => { 
				commit('SET_STATUS', 'error');
			})
		},
  },
  plugins: [createPersistedState()]
});
