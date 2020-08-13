<template>
    <div>
        <div v-if="isLoggedIn">
            <h4>Your profile</h4>
            <div class="profile">
                <img class="userpic" alt="userpic" src="https://via.placeholder.com/80">
                <div class="data">
                    <div class="username">{{ getUserData.username }}</div>
                    <div class="email">{{ getUserData.email }}</div>
                </div>
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

.profile {
    position: relative;
    width: 60%;
    margin: 4em auto;
    padding: .8em 1em;
    border: 1px solid #777;
    border-radius: 3px;
    text-align: left;
    font-size: 24px;
}

.userpic {
    position: absolute;
    left: 2%;
    transform: translateY(-6%);
    border-radius: 50%;
    margin-right: 3em;
}

.data {
    display: block;
    margin-left: 5em;
}

.username {
    font-weight: 600;
}

.email {
    font-weight: 400;
    font-style: italic;
    font-size: 22px;
    color: #bbb;
}

@media (max-width: 500px) {
    .profile {
        width: 80%;
    }

    .data {
        margin-left: 4.5em;
    }
}

@media (max-width: 360px) {
    .profile {
        width: 94%;
    }

    .data {
        margin-left: 4em;
    }
}
</style>
