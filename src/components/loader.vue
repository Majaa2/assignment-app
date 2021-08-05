<template>
  <div
    class="loader"
    :style="
      'height:' +
      height +
      ';width:' +
      width +
      ';border:' +
      border +
      ' solid #f3f3f3;border-top:' +
      border +
      ' solid ' +
      color
    "
  ></div>
</template>

<script>
export default {
  props: ["height", "width", "border", "color"],
};
</script>

<style>
.loader {
  border-radius: 50%;
  animation: spin 2s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>