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

export default {
    name: 'Saved',
    components: {
        AuthForm,
    },
    data() {
        return {
            savedPosts: []
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
}
</script>
