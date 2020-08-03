<template>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper grey darken-3">
            <router-link to="/" class="brand-logo">Postify</router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down right">
                <li><router-link to="/saved" class="blue-text text-darken-1">Saved</router-link></li>
                <li><router-link to="/profile" class="blue-text text-darken-1">Profile</router-link></li>
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

</style>
