import Vue from "vue";
import Vuex from "vuex";

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  Credentials: true,
});

Vue.use(Vuex);

export default new Vuex.Store({
  //données dont dépendent les components
  state: {
    status: '',
    user: {
      userId: -1,
      userAdmin: '',
      token: '',
    },
    data: {},
    posts: [],
    post: {},
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status;
    },
    LOG_USER(state, user) { 
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      window.localStorage.user = JSON.stringify(user);
      state.user = user;
    },
    USER_DATA(state, data) {
      state.data = data;
    },
    ALL_POSTS(state, posts){
      state.posts = posts;
    },
    ONE_POST(state, post) {
      state.post = post;
    }
  },
  actions: {
    login({commit}, user) {
      commit('SET_STATUS', 'loading'),
      instance.post('/user/login', user)
      .then((response) => {
        commit('SET_STATUS', '');
        commit('LOG_USER', response.data.data);
      })
      .catch(() => {
        commit('SET_STATUS', 'error')
      })
    },
    //commit permet d'éxécuter la mutation de quand on a créé le compte
    signup({commit}, user) {
      commit('SET_STATUS', 'loading'),
      instance.post('/user/signup', user)
      .then((response) => {
        commit('SET_STATUS', 'create');
        console.log(response);
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    profil({commit}, credentials) {
      commit('SET_STATUS', 'loading'),
      instance.get('/user/profil', credentials)
      .then((response) => {
        commit( 'USER_DATA', response.data.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    getAll({commit}) {
      commit('SET_STATUS', 'loading'),
      instance.get('/post/')
      .then((response) => {
        commit( 'ALL_POSTS', response.data.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    create({commit}, credentials) {
      commit('SET_STATUS', 'loading'),
      instance.post('/post/create', credentials)
      .then((response) => {
        commit('ONE_POST', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
  },
});
