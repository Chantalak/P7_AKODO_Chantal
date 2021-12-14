<template>
  <div class="post">
    <Post/>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '../components/Post.vue';

export default {
  name: "Home",
  components: {
    Post,
  },
};
</script>