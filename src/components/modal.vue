<template>
  <div id="myModal" class="modal" v-if="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div style="width: 100%">
        <span class="close" @click="close()">&times;</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 25px;
          width: 100%;
        "
        v-if="!$wait.is(`users getUser`)"
      >
        <form
          @submit.prevent="editUser()"
          style="display: flex; flex-direction: column; width: 60%"
        >
          <label for="name">User name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            name="name"
            placeholder="User name"
          />

          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            name="email"
            placeholder="Email"
          />

          <label for="avatar">Avatar</label>
          <input
            type="text"
            id="avatar"
            v-model="form.avatar"
            name="avatar"
            placeholder="Avatar"
          />
          <button type="submit">
            <p v-if="!$wait.is('users edit')">SPREMI PROMJENE</p>
            <Loader
              v-else
              height="12px"
              width="12px"
              border="6px"
              color="#ffb9c7"
            />
          </button>
        </form>
        <img
          v-if="form.avatar"
          style="height: 200px; width: 200px"
          :src="form.avatar"
        />
      </div>
      <Loader
        v-else
        height="120px"
        width="120px"
        border="14px"
        color="#363636"
      />
    </div>
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
      form: {},
    };
  },
  computed: {
    modal() {
      return this.$store.getters["getModal"];
    },
  },
  methods: {
    close() {
      this.$store.commit("SET_MODAL", false);
    },
    editUser() {
      waitFor(`users edit`, async function () {
        await this.$store.dispatch("editUser", this.form);
      }).apply(this);
    },
  },
  watch: {
    modal(val) {
      if (val) {
        waitFor(`users getUser`, async function () {
          await this.$store.dispatch("fetcSelectedUser").then((res) => {
            this.form = res;
          });
        }).apply(this);
      } else {
        this.$store.commit("SET_SELECTED_USER", null);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    :hover,
    :focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
  }
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

    input[type="text"] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    input[type="email"] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    input[type="submit"] {
      width: 100%;
      background-color: #363636;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button {
      width: 100%;
      padding: 10px;
      color: white;
      font-size: 17px;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      border-radius: 0 5px 5px 0;
      background: #363636;
      p {
        margin: 0 !important;
      }
    }
    // div {
    //   border-radius: 5px;
    //   background-color: #f2f2f2;
    //   padding: 20px;
    // }
  }
}
</style>