<template>
  <div class="article">
    <Navbar />
    <SelectPost />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue';
import SelectPost from '@/components/SelectPost.vue'

export default {
  name: "Profil",
  components: {
    Navbar,
    SelectPost,
  },
};
</script>
