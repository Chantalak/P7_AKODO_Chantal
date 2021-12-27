<template>
  <div class="home">
    <Navbar/>
    <Allposts/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue';
import Allposts from '../components/Allposts.vue';

export default {
  name: "Feed",
  components: {
    Navbar,
    Allposts,
  },
};
</script>