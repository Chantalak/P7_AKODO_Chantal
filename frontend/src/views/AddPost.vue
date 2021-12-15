<template>
  <div class="addpost">
    <Post/>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '../components/Post.vue';

export default {
  name: "AddPost",
  components: {
    Post,
  },
};
</script>