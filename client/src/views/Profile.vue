<template>
    <div>
        <div v-if="getVerifyResult">
            <h4>Your profile</h4>
            <div class="profile">
                <img class="userpic" alt="userpic" src="https://via.placeholder.com/80">
                <div class="data">
                    <div class="username">{{ getUserData.username }}</div>
                    <div class="email">{{ getUserData.email }}</div>
                    <div class="joined">Joined on {{ new Date(getUserData.created).toLocaleDateString() }}</div>
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

export default {
    name: 'Profile',
    components: {
        AuthForm,
    },
    computed: mapGetters(['getUserData', 'getVerifyResult']),
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

.joined {
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
        width: 90%;
        font-size: 20px;
    }

    .email {
        font-size: 18px;
    }

    .data {
        margin-left: 4.5em;
    }
}

@media (max-width: 360px) {
    .profile {
        width: 100%;
        font-size: 18px;
    }

    .email {
        font-size: 17px;
    }

    .data {
        margin-left: 4em;
    }
}
</style>
