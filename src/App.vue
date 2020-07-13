<template>
  <div id="app">
    <component :is="layout"> 
       <!-- <router-view/> -->
    </component> 
  </div>
</template>
<script>
  import AuthLayout from '@/layouts/AuthLayout'
  import MainLayout from '@/layouts/MainLayout'
export default {
  computed: {
    layout(){
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  },
  components: {
      MainLayout, AuthLayout
    }
  
}
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';  
  @import 'assets/style.css';
</style>
