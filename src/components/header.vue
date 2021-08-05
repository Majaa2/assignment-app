<template>
  <div class="header">
    <h2>Users CRUD</h2>
    <form @submit.prevent="searchUsers()" class="example">
      <input
        type="text"
        placeholder="Search.."
        name="search"
        v-model="search"
      />
      <button type="submit">
        <p v-if="!$wait.is('users search')">Search</p>
        <Loader
          v-else
          height="12px"
          width="12px"
          border="6px"
          color="#ffb9c7"
        />
      </button>
    </form>
  </div>
</template>

<script>
import { waitFor } from "vue-wait";
import Loader from "../components/loader.vue";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchUsers() {
      waitFor("users search", async function () {
        await this.$store.dispatch("fetchUsers", this.search);
      }).apply(this);
    },
  },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  background-color: #ffb9c7;
  height: 25% !important;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    color: #363636;
  }
  .example {
    display: flex;
    input[type="text"] {
      padding: 10px;
      font-size: 17px;
      border: 1px solid #363636;
      float: left;
      width: 300px;
      background: #f1f1f1;
      border-radius: 5px 0 0 5px;
    }
    button {
      float: left;
      padding: 10px;
      color: white;
      font-size: 17px;
      border: 1px solid #363636;
      border-left: none;
      cursor: pointer;
      border-radius: 0 5px 5px 0;
      background: #363636;
      p{
          margin: 0 !important;
      }
    }
  }
}
</style>