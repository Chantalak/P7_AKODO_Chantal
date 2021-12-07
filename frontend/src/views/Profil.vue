<template>
  <div class="profil">
    <Navbar />
    <UserProfil />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue';
import UserProfil from '@/components/UserProfil.vue'

export default {
  name: "Profil",
  components: {
    Navbar,
    UserProfil,
  },
};
</script>
