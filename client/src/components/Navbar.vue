<template>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper grey darken-3">
            <router-link to="/" class="brand-logo">Postify</router-link>
            <ul class="right hide-on-med-and-down right">
                <li><router-link to="/saved" class="blue-text text-darken-1">Saved</router-link></li>
                <li><router-link to="/profile" class="blue-text text-darken-1">Profile</router-link></li>
                <li><a class="blue-text text-darken-1" @click="logout" v-show="isLoggedIn">Logout</a></li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'Navbar',
    methods: {
        ...mapActions(['removeUserData']),
        logout() {
            localStorage.removeItem("token");
            this.removeUserData();
            location.reload();
        }
    },

    computed: {
        isLoggedIn() {
            if (localStorage.getItem("token") && localStorage.getItem("token") != "undefined") {
                return true;
            }

            return false;
        }
    }
};
</script>

<style scoped>
nav {
    width: 100%;
    text-align: left;
}
.nav-wrapper {
    padding: 0 2rem;
}

</style>
