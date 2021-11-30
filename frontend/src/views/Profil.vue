<template>
  <div class="profil">
    <UserProfil />
  </div>
</template>

<script>
// @ is an alias to /src
import UserProfil from '@/components/UserProfil.vue'

export default {
  name: "Profil",
  components: {
    UserProfil,
  },
};
</script>
