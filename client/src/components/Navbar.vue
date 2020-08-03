<template>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper grey darken-3">
            <router-link to="/" class="brand-logo">Postify</router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down right">
                <li class="light-blue -text"><router-link to="/saved">Saved</router-link></li>
                <li><router-link to="/profile">Profile</router-link></li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
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

.navbar-fixed nav ul li:hover {
   color: #1D9AF2;
}

</style>