<template>
  <div class="article">
    <Navbar />
    <Post />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../../components/Navbar.vue';
import Post from '../../components/Post/Post.vue'

export default {
  name: "Profil",
  components: {
    Navbar,
    Post,
  },
};
</script>
