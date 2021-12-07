import Vue from "vue";
import Vuex from "vuex";

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: false,
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  if (token) {
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
    user: {
      userId: -1,
      isAdmin: '',
      token: '',
    },
    userInfos: {},
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
      state.user.token = user.token;
    },
    LOG_DATA(state, userInfos) {
      state.userInfos = userInfos;
    },
  },
  actions: {
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
    profil({commit}) {
      commit('SET_STATUS', 'loading'),
      instance.get('/users/profil')
      .then((response) => {
        commit('userInfos', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
  },
});
