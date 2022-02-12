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
  return Promise.reject(error);
})

instance.interceptors.response.use((config) => {
  let token = localStorage.getItem('token')
  if (config) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: {
      isLoggedIn: !!localStorage.getItem('token')
    },

    //AUTH
    currentUser: {}, 

    //USER
    users: [],
    user: {}, 
    
    //POST
    posts: [],
    article: {},
    post: {},

    //COMMENT
    comments: [],
    commentary: {},
    comment: {},

  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    id: (state) => state.currentUser.userId,
    commentId: (state) => state.comments[0].id
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status;
    },

    //AUTH
    LOG_USER(state, currentUser) { 
      window.localStorage.currentUser = JSON.stringify(currentUser);
      state.currentUser = currentUser;
    },

    //USER
    ALL_USERS(state, users){
      state.users = users;
    },
    LOG_IN (state) {
      state.pending = true;
    },
    DATA_USER(state, user) {
      window.localStorage.user = JSON.stringify(user);
      state.user = user;
      state.isLoggedIn = true;
    },
    LOG_OUT(state) {
      state.isLoggedIn = false;
    },

    //POST
    ALL_POSTS(state, posts){
      state.posts = posts;
    },
    POST_ARTICLE(state, article) {
      window.localStorage.article = JSON.stringify(article);
      state.article = article;
    },
    DATA_POST(state, post){
      window.localStorage.post = JSON.stringify(post);
      state.post = post;
    },

    //COMMENT
    ALL_COMMENTS(state, comments){
      state.comments = comments;
    },
    POST_COMMENT(state, commentary) {
      window.localStorage.article = JSON.stringify(commentary);
      state.commentary = commentary;
    },
    DATA_COMMENT(state, comment) {
      window.localStorage.post = JSON.stringify(comment);
      state.comment = comment;
    },
    
  },
  actions: {
    //AUTH
    signup: ({commit}, userDatas) => {
      return new Promise((resolve, reject) => {
        commit('SET_STATUS', 'loading')
        instance.post('/auth/signup', userDatas)
        .then((response) => {
          resolve(response)
          commit('SET_STATUS', 'created');
          console.log(response);
        })
        .catch((error) => {
          reject(error)
          commit('SET_STATUS', 'error');
          console.log(error);
        }) 
      })
    },
    login: ({commit}, userDatas) => {
      return new Promise((resolve, reject) => {
        commit('SET_STATUS', 'loading'),
        instance.post('/auth/login', userDatas)
        .then((response) => {
          resolve(response);  
          commit('SET_STATUS', 'login');
          localStorage.setItem('token', response.data.token);
          commit('LOG_USER', response.data);
          console.log(response);
        })
        .catch((error) => {
          reject(error)
          commit('SET_STATUS', 'error');
          console.log(error);
        })
      })
    },
    logout: ({commit}) => {
      localStorage.clear();
      location.replace(location.origin); 
      commit('LOG_OUT');
    },

    //USER
    getAllUsers({commit}, userDatas) {
      commit('SET_STATUS', 'loading'),
      instance.get('/user/', userDatas)
      .then((response) => {
        commit( 'ALL_USERS', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    getOneUser({commit}, userDatas) {
      commit('SET_STATUS', 'loading'),
      instance.get(`/user/${this.getters.id}`, userDatas)
      .then((response) => {
        commit( 'DATA_USER', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    modifyOneUser({commit}, userDatas) {
      commit('SET_STATUS', 'loading'),
      instance.post(`/user/${this.getters.id}`, userDatas)
      .then((response) => {
        commit( 'DATA_USER', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    deleteUser({commit}, userDatas) {
      commit('SET_STATUS', 'loading'),
			instance.delete(`/user/${this.getters.id}`, userDatas)
			.then((response)=> {
        commit('SET_STATUS', '');
				console.log(response);
			})
			.catch(() => { 
				commit('SET_STATUS', 'error');
			})
		},

    //POST
    getAllPosts({commit} , postDatas) {
      commit('SET_STATUS', 'loading'),
      instance.get('/post/', postDatas)
      .then((response) => {
        localStorage.setItem('postId', response.data.id);
        commit( 'ALL_POSTS', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    createOnePost({commit}, postDatas) {
      commit('SET_STATUS', 'loading'),
      instance.post('/post/create', postDatas)
      .then((response) => {
        commit('SET_STATUS', '');
        commit( 'POST_ARTICLE', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    getOnePost({commit}, postDatas) {
      commit('SET_STATUS', 'loading'),
      instance.get('/post/' + window.localStorage.getItem('postId'), postDatas)
      .then((response) => {
        localStorage.setItem('post', response.data);
        commit( 'DATA_POST', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    deleteOnePost({commit}, postDatas) {
      commit('SET_STATUS', 'loading'),
      instance.delete('/post/' + window.localStorage.getItem('postId'), postDatas)
      .then((response)=> {
        commit('SET_STATUS', '');
				console.log(response);
			})
			.catch(() => { 
				commit('SET_STATUS', 'error');
			})
    },

    //COMMENT
    getAllComments({commit} , postDatas) {
      commit('SET_STATUS', 'loading'),
      instance.get('/comment/', postDatas)
      .then((response) => {
        commit( 'ALL_COMMENTS', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    createOneComment({commit}, commentDatas) {
      commit('SET_STATUS', 'loading'),
      instance.post('/comment/create', commentDatas)
      .then((response) => {
        commit('SET_STATUS', '');
        commit('POST_COMMENT', response.data);
        console.log(response)
      })
      .catch(() => {
        commit('SET_STATUS', 'error');
      })
    },
    deleteOneComment({commit}, commentDatas) {
      commit('SET_STATUS', 'loading'),
			instance.delete(`/comment/${this.getters.commentId}`, commentDatas)
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
