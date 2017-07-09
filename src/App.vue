<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  },
  data () {
    return {
    }
  }
}
</script>

<style>
  #app{
    height: auto;
    display: flex;
    flex-direction: column;
   background: #43cea2;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #185a9d, #43cea2);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #185a9d, #43cea2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
;

  }
</style>
