<template>
    <div>
        <div v-if="isLoggedIn">
            <h4>This is your profile!</h4>
            <div class="profile">
                {{ getUserData }}
            </div>
        </div>
        <div v-else>
            <AuthForm />
        </div>
    </div>
</template>

<script>
import AuthForm from '../components/auth/AuthForm.vue';
import {mapGetters, mapActions} from 'vuex';
import jwt from 'jsonwebtoken';
import config from '/Users/esipe/Postify/server/config/default.json';

export default {
    name: 'Profile',
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
        ...mapGetters(['getUserData']),
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
