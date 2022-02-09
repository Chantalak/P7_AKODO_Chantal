<template>
  <div class="app">
    <Signup/>
  </div>
</template>

<script>
import Signup from '../../components/Auth/Signup.vue';

export default {
  name: "AuthSignup",
  components: {
    Signup
  },
};
</script>