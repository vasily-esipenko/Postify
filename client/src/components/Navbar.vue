<template>
    <div>
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
        <div class="navbar-fixed-mobile">
            <nav>
                <div class="nav-wrapper nav-wrapper-mobile grey darken-3">
                    <router-link to="/" class="brand-logo">Postify</router-link>
                    <span class="burger-menu-button" @click="displayMenu"><i class="fas fa-bars"></i></span>
                    <div class="burger-menu" v-show="displayBurgerMenu">
                        <ul>
                            <li><router-link to="/saved" class="blue-text text-darken-1">Saved</router-link></li>
                            <li><router-link to="/profile" class="blue-text text-darken-1">Profile</router-link></li>
                            <li><a class="blue-text text-darken-1" @click="logout" v-show="isLoggedIn">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'Navbar',
    data() {
        return {
            displayBurgerMenu: false,
        };
    },
    methods: {
        ...mapActions(['removeUserData', 'addSavedPostsToServer']),
        logout() {
            const savedData = {
                email: this.getUserData.email,
                savedPosts: JSON.parse(localStorage.getItem("savedPosts"))
            };
            localStorage.removeItem("token");
            this.removeUserData();
            this.addSavedPostsToServer(savedData);
            localStorage.removeItem("savedPosts");
            location.reload();
        },
        displayMenu() {
            this.displayBurgerMenu = !this.displayBurgerMenu;
        }
    },

    computed: {
        ...mapGetters(['getUserData', 'getSavedPosts']),
        isLoggedIn() {
            if (localStorage.getItem("token") && localStorage.getItem("token") != "undefined") {
                return true;
            }

            return false;
        },
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

.navbar-fixed-mobile {
    display: none;
}

.burger-menu-button {
    cursor: pointer;
}

.burger-menu {
    border: 1px solid #333;
    border-radius: 3px;
    width: 35%;
    z-index: 1;
    background-color: #333;
    position: absolute;
    padding: .8rem;
    overflow: hidden;
}

@media (max-width: 993px) {
    .navbar-fixed-mobile {
        display: block;
    }

    .navbar-fixed {
        display: none;
    }
}
</style>
