<template>
  <div class="app">
    <Navbar/>
    <Posts/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../../components/Navbar.vue';
import Posts from '../../components/Post/Posts.vue';

export default {
  name: "Allposts",
  components: {
    Navbar,
    Posts,
  },
};
</script>