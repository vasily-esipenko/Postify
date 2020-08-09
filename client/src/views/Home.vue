<template>
<div>
    <div v-if="hasToken">
        <PostForm />
    </div>
    <div v-else>
        <AuthForm />
    </div>
    <h4>The latest posts: {{ getMessages.length }}</h4>
    <Post />
</div>
</template>

<script>
import Post from '@/components/Post.vue';
import PostForm from '@/components/PostForm.vue';
import AuthForm from '@/components/auth/AuthForm.vue';
import {mapGetters} from 'vuex';

export default {
  name: 'Home',
  components: {
      Post,
      PostForm,
      AuthForm,
  },
  computed: mapGetters(['getMessages']),
  methods: {
      hasToken() {
        if (localStorage.getItem("token")) {
            return true;
        }

        return false;
      },
  }
};
</script>
