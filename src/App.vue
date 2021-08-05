<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { waitFor } from "vue-wait";
export default {
  name: "App",
  components: {},
  beforeCreate() {
    waitFor("users initial fetch", async function () {
      await this.$store.dispatch("fetchUsers", "");
    }).apply(this);
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  height: 100vh !important;
  margin: 0;
  padding: 0;
}
</style>
