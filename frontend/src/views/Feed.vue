<template>
  <div class="home">
    <Navbar/>
    <Post/>
    <Allposts/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue';
import Post from '../components/Post.vue';
import Allposts from '../components/Allposts.vue';

export default {
  name: "Home",
  components: {
      Navbar,
      Post,
      Allposts,
  },
};
</script>