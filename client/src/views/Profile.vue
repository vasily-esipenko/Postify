<template>
    <div>
        <AuthForm />
    </div>
</template>

<script>
import AuthForm from '../components/auth/AuthForm.vue';

export default {
    name: 'Profile',
    components: {
        AuthForm,
    }
}
</script>