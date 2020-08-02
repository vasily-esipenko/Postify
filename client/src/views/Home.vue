<template>
<div>
    <h3>The latest posts:</h3>
    <Post />
</div>
</template>

<script>
import Post from '@/components/Post.vue';

export default {
  name: 'Home',
  components: {
      Post,
  },
};
</script>
