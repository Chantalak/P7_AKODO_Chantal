<template>
  <div class="profil">
    <Navbar />
    <Profil />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../../components/Navbar.vue';
import Profil from '../../components/User/Profil.vue'

export default {
  name: "UserProfil",
  components: {
    Navbar,
    Profil,
  },
};
</script>
