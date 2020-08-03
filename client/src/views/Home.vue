<template>
<div>
    <PostForm />
    <h4>The latest posts: {{ getMessages.length }}</h4>
    <Post />
</div>
</template>

<script>
import Post from '@/components/Post.vue';
import PostForm from '@/components/PostForm.vue';
import {mapGetters} from 'vuex';

export default {
  name: 'Home',
  components: {
      Post,
      PostForm
  },
  computed: mapGetters(['getMessages'])
};
</script>
