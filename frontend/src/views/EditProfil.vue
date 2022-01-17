<template>
  <div class="home">
    <Navbar/>
    <UpdateProfil/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue';
import UpdateProfil from '../components/UpdateProfil.vue';

export default {
  name: "EditProfil",
  components: {
    Navbar,
    UpdateProfil,
  },
};
</script>