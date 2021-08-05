<template>
  <div id="myModal" class="modal" v-if="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <!-- <div style="width: 100%"> -->
        <!-- <span class="close" @click="close()">&times;</span> -->
        <div class="container">
          <h1>Delete user</h1>
          <p>Are you sure you want to delete this user?</p>

          <div class="clearfix">
            <button type="button" @click="close()" class="cancelbtn">
              Cancel
            </button>
            <button type="button" @click="deleteUser()" class="deletebtn">
              <p v-if="!$wait.is(`users delete ${userID}`)">Delete</p>
              <Loader
                v-else
                height="6px"
                width="6px"
                border="4px"
                color="#ffb9c7"
              />
            </button>
          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { waitFor } from "vue-wait";
import Loader from "./loader.vue";

export default {
  components: {
    Loader,
  },
  props: ["modal", "userID"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteUser() {
      waitFor(`users delete ${this.userID}`, async function () {
        await this.$store
          .dispatch("deleteUser", this.userID)
          .then((res) => this.close());
      }).apply(this);
    },

    close() {
      this.$emit("close");
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

    height: 200px;
    border: 1px solid #888;
    width: 80%;

    button {
      background-color: #04aa6d;
      color: white;
      // padding: 14px 20px;
      // margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
      opacity: 0.9;
      height: 50px;
            p{
        margin: 0;
        padding: 0;
      }
    }

    button:hover {
      opacity: 1;
    }

    .cancelbtn,
    .deletebtn {
      float: left;
      width: 50%;
    }

    .cancelbtn {
      background-color: #ccc;
      color: black;
    }

    .deletebtn {
      background-color: #f44336;
    }

    .container {
      // padding: 16px;
      text-align: center;
    }
  }
}
</style>