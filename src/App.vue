<template>
  <div id="app">
    <!-- <router-link to="/orderDetailMap">Home</router-link> -->
    <router-view />
  </div>
</template>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100%;
  min-height: 100%;
  background-color: $color-bg;
  color: $color-text-black;
  font-size: $font-14;
  line-height: 1.35;
}
</style>
