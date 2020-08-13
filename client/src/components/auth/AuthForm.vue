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
    margin: 4rem auto 6rem;
    padding: 1rem 1.2rem;
}

.change {
    margin: 1.2rem auto;
    cursor: pointer;
    color: #999;
    text-decoration: underline dashed #999;
}


@media (max-width: 660px) {
    .auth {
        width: 74%;
    }
}

@media (max-width: 660px) {
    .auth {
        width: 78%;
    }
}

@media (max-width: 415px) {
    .auth {
        margin: 2rem auto;
        width: 90%;
    }

    .change {
        font-size: 16px;
    }
}

@media (max-width: 360px) {
    .auth {
        width: 96%;
        margin: 2em auto;
    }
}
</style>
