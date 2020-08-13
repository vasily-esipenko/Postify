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
                    <span class="buttons">
                        <i class="far fa-heart"></i>
                        <i class="fas fa-share" id="share"></i>
                        <i class="fas fa-bookmark" id="save"></i>
                    </span>
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
import AuthForm from '../components/auth/AuthForm.vue';
import {mapActions, mapGetters} from 'vuex';
import jwt from 'jsonwebtoken';
import config from '/Users/esipe/Postify/server/config/default.json';

export default {
    name: 'Saved',
    components: {
        AuthForm,
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

.buttons {
    font-size: 20px;
    color: #777;
    opacity: .8;
}

#share {
    margin-left: 2rem;
}

#save {
    margin-left: 2rem;
    color: #1D9AF2;
}

.date {
    font-size: 15px;
    margin-left: 30rem;
    text-align: right;
}

@media (max-width: 415px) {
    .buttons {
        font-size: 18px;
    }
}
</style>
