<template>
    <div>
        <h4>Log in to write posts</h4>
        <div class="alert" v-if="alertMessage" role="alert">
            {{alertMessage}}
        </div>
        <div class="result" v-if="getLogResult" role="alert">
            <p>{{ getLogResult }}</p>
        </div>
        <div class="inputs">
            <input class="email grey-text text-lighten-5" type="email" placeholder="email" v-model="authForm.email">
            <input class="password grey-text text-lighten-5" type="password" placeholder="password" v-model="authForm.password">
        </div>
        <span class="buttons">
            <button class="login" @click="login">Log in</button>
        </span>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string().trim().email({ tlds: {allow: false} }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
});

export default {
    name: 'Login',
    data() {
        return {
            authForm: {
                email: "",
                password: "",
            },
            alertMessage: "",
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        login() {
            if (this.validUser()) {
                this.loginUser(this.authForm);
                this.authForm.email = this.authForm.password = "";
                setTimeout(() => {
                    if (localStorage.getItem("token") && localStorage.getItem("token") != "undefined")
                        location.reload();
                }, 500);
            }
        },
        validUser() {
            const result = schema.validate(this.authForm);

            if (result.error == null) {
                return true;
            }

            if (result.error.message.includes('email')) {
                this.alertMessage = 'Email is invalid';
            } else if (result.error.message.includes('password')) {
                this.alertMessage = 'Password is invalid'
            }

            return false;
        }
    },
    computed: mapGetters(['getLogResult']),
}
</script>

<style scoped>
.alert {
    width: 80%;
    height: 3rem;
    border: 1px solid #f22;
    border-radius: 3px;
    margin: 1rem auto;
    color: #fafafa;
    background-color: #f22;
}

.result {
    width: 80%;
    height: auto;
    margin: 1rem auto;
    padding: .5rem .3rem;
    color: #fafafa;
    border: 1px solid #1D9AF2;
    border-radius: 3px;
    text-align: center;
    background-color: #1D9AF2;
}

.inputs {
    padding: 2rem 0.3rem;
    color: #fafafa;
}

.login {
    color: #50e3c2;
    border: 1px solid #50e3c2;
    padding: 2rem 0;
    background-color: #292D3E;
    border-radius: 4px;
    padding: 0 15px;
    cursor: pointer;
    height:32px;
    font-size:14px;
    transition: all 0.2s ease-in-out;
}

.login:hover {
    transform: scale(1.1);
}

</style>
