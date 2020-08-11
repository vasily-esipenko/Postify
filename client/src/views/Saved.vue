<template>
    <div>
        <div v-if="isLoggedIn">
            <h5>Your saved posts</h5>
        </div>
        <div v-else>
            <AuthForm />
        </div>

        <hr>

        <div v-if="savedPosts.length">
            {{ savedPosts }}
        </div>
        <div v-else>
            <p class="noposts">You have no saved posts right now</p>
        </div>
    </div>
</template>

<script>
import AuthForm from '../components/auth/AuthForm.vue';
import {mapActions} from 'vuex';
import jwt from 'jsonwebtoken';
import config from '/Users/esipe/Postify/server/config/default.json';

export default {
    name: 'Saved',
    components: {
        AuthForm,
    },
    data() {
        return {
            savedPosts: [],
            isLogged: false,
        }
    },
    methods: {
        ...mapActions(['addUserData']),
    },
    computed: {
        isLoggedIn() {
            if (localStorage.getItem("token") && localStorage.getItem("token") != "undefined") {
                jwt.verify(JSON.parse(localStorage.getItem("token")), config.tokenSecret, (err, decoded) => {
                    if (err) {
                        console.log(err.message);
                        return false;
                    }
                    
                    if (decoded) {
                        console.log(decoded);
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
