<template>
  <div>

      <!-- <router-link to="/login" >登录</router-link> -->
      <template v-if="!flag">
              <router-view></router-view>
      </template>
      <template v-else>
        <div>
          <info></info>
        </div>
      </template>
      
  </div>
</template>

<script>
// import login from './pages/login.vue'
import info from './pages/info.vue'


export default {
  name: 'App',
  components: {
    info
    
  },
  data(){
    return{
        flag:localStorage.getItem('xuehao')
    }
  },
  mounted() {
    if(!localStorage.getItem('xuehao')){
      //未登录
      console.log("发现用户没有登录，正在跳转login")
      this.$router.replace({
        path:'/login'
      })
    }
    
    
  },
}
</script>

<style>

</style>

