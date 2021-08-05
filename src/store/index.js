import Vue from "vue";
import Vuex from "vuex";
import api from "../service/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    modal: false,
    selectedUserId: null,
  },
  getters: {
    getUsers(state) {
      return state.users.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
      });;
    },
    getModal(state) {
      return state.modal;
    },
    getUserId(state) {
      return state.selectedUserId;
    },
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    REMOVE_DELETED(state, id) {
      state.users = state.users.filter((x) => x.id != id);
    },
    SET_MODAL(state, modal) {
      state.modal = modal;
    },
    SET_SELECTED_USER(state, id) {
      state.selectedUserId = id;
    },
    UPDATE_USER(state, user) {
      var allUsers = state.users.filter((x) => x.id != user.id);
      allUsers.push(user);
      state.users = allUsers;
      state.modal = false;
    },
  },
  actions: {
    async fetchUsers({ commit }, name) {
      let res = await api.fetchUsers(name);
      commit("SET_USERS", res.data);
    },
    async deleteUser({ commit }, id) {
      let res = await api.deleteUser(id);
      if (res.status == 200) {
        commit("REMOVE_DELETED", id);
      }
    },
    async fetcSelectedUser({ getters }) {
      let res = await api.fetchUserById(getters.getUserId);
      return res.data;
    },
    async editUser({ commit }, user) {
      let res = await api.editUser(user);
      commit("UPDATE_USER", res.data);
    },
  },
  modules: {},
});
