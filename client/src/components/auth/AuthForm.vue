<template>
    <div>
        <div class="auth">
            <div v-if="toggleChange">
                <Login />
            </div>
            <div v-else>
                <Signup />
            </div>
            <div class="change" @click="change">Change to other option</div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import Signup from './Signup.vue';
import Login from './Login.vue';

export default {
    name: 'AuthForm',
    data() {
        return {
            toggleChange: false,
        }
    },
    methods: {
        change() {
            this.toggleChange = !this.toggleChange;
        }
    },
    components: {
        Signup,
        Login,
    }
}
</script>

<style scoped>
.auth {
    width: 62%;
    border: 1px solid #777;
    border-radius: 3px;
    margin: 40px auto 60px;
    padding: 1rem 1.2rem;
}

.change {
    margin: 1.2rem auto;
    cursor: pointer;
    color: #999;
    text-decoration: underline dashed #999;
}

</style>
