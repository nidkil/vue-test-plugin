<template>
  <div id="app">
    <img alt="Vue logo" src="/vue-test-plugin-logo.png" width="500" />
    <p style="color: red">
      <b>Using {{ $tst.pluginName }} v{{ $tst.version }}</b>
    </p>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  created () {
    this.$tst && console.log(`app::created: ${this.$tst.pluginName} v${this.$tst.version}`)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
