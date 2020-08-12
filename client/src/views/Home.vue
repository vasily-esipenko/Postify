<template>
<div>
    <div v-if="isLoggedIn">
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
import {mapGetters, mapActions} from 'vuex';
import jwt from 'jsonwebtoken';
import config from '/Users/esipe/Postify/server/config/default.json';

export default {
  name: 'Home',
  data() {
      return {
          isLogged: false,
      }
  },
  components: {
      Post,
      PostForm,
      AuthForm,
  },
  methods: {
      ...mapActions(['addUserData']),
  },
  computed: {
    ...mapGetters(['getMessages']),
    isLoggedIn() {
        if (localStorage.getItem("token") && localStorage.getItem("token") != "undefined") {
            jwt.verify(JSON.parse(localStorage.getItem("token")), config.tokenSecret, (err, decoded) => {
                if (err) {
                    console.log(err.message);
                    return false;
                }
                
                if (decoded) {
                    const decodedData = decoded;
                    this.addUserData(decodedData);
                    this.isLogged = true;
                }  
            });
        }

        return this.isLogged
    }
  },
};
</script>
