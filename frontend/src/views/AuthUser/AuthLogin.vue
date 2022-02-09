<template>
  <div class="home">
    <Login/>
  </div>
</template>

<script>
import Login from '../../components/Auth/Login.vue';

export default {
  name: "AuthLogin",
  components: {
    Login
  },
};
</script>