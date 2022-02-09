<template>
  <div class="update">
    <Navbar/>
    <Update/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../../components/Navbar.vue';
import Update from '../../components/User/Update.vue';

export default {
  name: "UserUpdate",
  components: {
    Navbar,
    Update,
  },
};
</script>