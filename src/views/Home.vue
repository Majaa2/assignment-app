<template>
  <div class="home">
    <Header />
    <Table v-if="!$wait.is('users initial fetch')" class="table-component" />
    <Loader
      style="margin-top: 15%"
      v-else
      height="120px"
      width="120px"
      border="16px"
      color="#363636"
    />
    <Modal />
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Table from "../components/table.vue";
import Loader from "../components/loader.vue";
import Modal from "../components/modal.vue";
export default {
  name: "Home",
  components: {
    Header,
    Table,
    Loader,
    Modal,
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;
  .table-component {
    margin-top: 8%;
  }
}
</style>