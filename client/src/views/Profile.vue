<template>
    <div>
        <div v-if="isLoggedIn">
            <h4>This is your profile!</h4>
        </div>
        <div v-else>
            <AuthForm />
        </div>
    </div>
</template>

<script>
import AuthForm from '../components/auth/AuthForm.vue';

export default {
    name: 'Profile',
    components: {
        AuthForm,
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
