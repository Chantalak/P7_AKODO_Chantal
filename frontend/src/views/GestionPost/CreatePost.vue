<template>
  <div class="app">
    <Navbar/>
    <Poster/>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import Poster from '../../components/Post/Poster.vue';

export default {
  name: "CreatePost",
  components: {
    Poster,
    Navbar
  },
};
</script>