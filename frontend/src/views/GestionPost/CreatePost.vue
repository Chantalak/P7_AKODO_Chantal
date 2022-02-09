<template>
  <div class="post">
    <Navbar/>
    <Post/>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import Post from '../../components/Post/Post.vue';

export default {
  name: "CreatePost",
  components: {
    Post,
    Navbar
  },
};
</script>