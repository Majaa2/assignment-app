import axios from "axios";

export default {
  fetchUsers(name) {
    return axios.get(`/users?name=${name}`).then((res) => {
      return res;
    });
  },
  deleteUser(id) {
    return axios.delete(`/users/${id}`).then((res) => {
      return res;
    });
  },
  fetchUserById(id) {
    return axios.get(`/users/${id}`).then((res) => {
      return res;
    });
  },
  editUser(user) {
    return axios.put(`/users/${user.id}`, user).then((res) => {
      return res;
    });
  },
};
