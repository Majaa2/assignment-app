<template>
  <div class="table">
    <table v-if="users.length">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Name</th>
          <th>Email</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody style="text-align: center" v-for="(user, i) in users" :key="i">
        <tr>
          <td>
            <img
              style="height: 50px; width: 50px"
              :src="user.avatar"
              :alt="user.name"
            />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.createdAt | moment("DD/MM/YYYY") }}</td>
          <td>
            <div class="actions">
              <button class="btn_action blue" @click="openModal(user.id)">EDIT</button>
              <button class="btn_action red" @click="deleteUser(user.id)">
                <p v-if="!$wait.is(`users delete ${user.id}`)">DELETE</p>
                <Loader
                  v-else
                  height="6px"
                  width="6px"
                  border="4px"
                  color="#ffb9c7"
                />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <span v-else> No data found! </span>
    <ModalConfirm :modal="modal" :userID="selectedUserId" @close="modal=false"/>
  </div>
</template>

<script>
import { waitFor } from "vue-wait";
import Loader from "../components/loader.vue";
import ModalConfirm from "../components/modalConfirm.vue";

export default {
  components: {
    Loader,
    ModalConfirm
  },
  computed: {
    users() {
      return this.$store.getters["getUsers"];
    },
  },
  data() {
    return {
        modal: false,
        selectedUserId: null
    };
  },
  methods: {
    deleteUser(id) {
        this.selectedUserId = id
        this.modal = true
    //   waitFor(`users delete ${id}`, async function () {
    //     await this.$store.dispatch('deleteUser', id);
    //   }).apply(this);
    },
    openModal(id){
        this.$store.commit('SET_SELECTED_USER', id);
        this.$store.commit('SET_MODAL', true);
    }
  },
};
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  td {
    padding: 5px 5px 0 10px;
  }
  .actions {
    display: flex;
    flex-direction: column;
    .btn_action {
      border: none;
      border-radius: 0;
      color: white;
      margin: 3px;
      padding: 5px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      p{
          padding: 0;
          margin: 0;
      }
    }
    .red {
      background-color: #b11f24;
    }
    .blue {
      background-color: #0175eb;
    }
  }
}
</style>