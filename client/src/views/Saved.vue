<template>
    <div>
        <div v-if="isLoggedIn">
            <h5>Your saved posts</h5>
        </div>
        <div v-else>
            <AuthForm />
        </div>

        <hr>

        <div v-if="getSavedPosts.length">
            <div class="post" v-for="post in getSavedPosts" v-bind:key="post._id">
            <div class="post-header">
                <span>
                <img class="userpic" alt="userpic" src="https://via.placeholder.com/40">
                <span class="username">{{ post.username }}</span>
                </span>
            </div>
            <div class="post-body">
                <div class="post-subject">{{ post.subject }}</div>
                <p class="post-text">{{ post.message }}</p>
            </div>
            <div class="reaction-bar">
                <span> 
                    <Like /> 
                    <Share />
                    <Save/>
                    <span class="date"> {{ new Date(post.created).toLocaleDateString() }} </span>
                </span>
            </div>
        </div>
        </div>
        <div v-else>
            <p class="noposts">You have no saved posts right now</p>
        </div>
    </div>
</template>

<script>
import Like from '../components/buttons/Like.vue';
import Save from '../components/buttons/Save.vue';
import Share from '../components/buttons/Share.vue';
import AuthForm from '../components/auth/AuthForm.vue';
import {mapActions, mapGetters} from 'vuex';
import jwt from 'jsonwebtoken';
import config from '/Users/esipe/Postify/server/config/default.json';

export default {
    name: 'Saved',
    components: {
        AuthForm,
        Like,
        Save,
        Share,
    },
    data() {
        return {
            isLogged: false,
        }
    },
    methods: {
        ...mapActions(['addUserData']),
    },
    computed: {
        ...mapGetters(['getSavedPosts']),
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

            return this.isLogged;
        }
    }
}
</script>

<style scoped>

.post {
    width: 60%;
    height: auto;
    margin: 40px auto;
    padding: 1rem;
    border: 1px solid #777;
    border-radius: 3px;
    z-index: 1;
}

.post-header {
    text-align: left;
    font-size: 14px;
    margin-bottom: 4px;
    width: 30%;
    border: 1px solid #777;
    border-radius: 3px;
    padding: 4px;
}

.username {
    display: inline;
    margin-left: 1rem;
    font-weight: 600;
    font-style: italic;
}

.post-body {
    text-align: left;
    border-bottom: 1px solid #777;
}

.post-subject {
    text-align: center;
    font-size: 20px;
}

.post-text {
    margin-top: 4px;
    font-size: 17px;
    overflow-wrap: break-word;
}

.reaction-bar {
    margin: 1rem 1.5rem 0;
    padding: 0;
    text-align: left;
}

.date {
    font-size: 15px;
    margin-left: 30rem;
    text-align: right;
}

</style>
