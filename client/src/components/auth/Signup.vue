<template>
    <div>
        <h4 class="title">Sign up to write posts</h4>
        <div class="alert" v-show="alertMessage" role="alert">
            {{alertMessage}}
            <span class="closeAlert" @click="closeAlert"><i class="far fa-times-circle"></i></span>
        </div>
        <div class="result" v-show="getResult && getResultServer" role="alert">
            {{ getResult }}
            <span class="closeLogResult" @click="closeLogResult"><i class="far fa-times-circle"></i></span>
        </div>
        <div class="inputs">
            <input class="username grey-text text-lighten-5" type="text" placeholder="username" v-model="authForm.username">
            <input class="email grey-text text-lighten-5" type="email" placeholder="email" v-model="authForm.email">
            <input class="password grey-text text-lighten-5" type="password" placeholder="password" v-model="authForm.password">
            <input class="password grey-text text-lighten-5" type="password" placeholder="repeat password" v-model="authForm.confirmPassword" @keyup.enter="register">
        </div>
        <span class="buttons">
            <button class="signup" @click="register">Sign Up</button>  
        </span>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30)
    .required(),
  email: Joi.string().email({ tlds: {allow: false} }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).min(8).required(),
  confirmPassword: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).min(8).required(),
});

export default {
    name: 'Signup',
    data() {
        return {
            authForm: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            alertMessage: "",
            getResultServer: true,
        }
    },
    methods: {
        ...mapActions(['registerUser', 'verifyUser']),
        register() {
            if (this.validUser()) {
                const user = {
                    username: this.authForm.username,
                    email: this.authForm.email,
                    password: this.authForm.password
                };
                this.registerUser(user);
                this.authForm.username = this.authForm.email = this.authForm.password = this.authForm.confirmPassword = "";
                setTimeout(() => {
                    const token = {token: JSON.parse(localStorage.getItem("token"))};
                    this.verifyUser(token);
                    location.reload();
                }, 500);
            }
        
        },
        validUser() {
            if (this.authForm.password != this.authForm.confirmPassword) {
                this.alertMessage = `Passwords don't match. Try again, please`;
                return false;
            }

            const result = schema.validate(this.authForm);
            if (result.error == null) {
                return true;
            }

            if (result.error.message.includes('username')) {
                this.alertMessage = 'Username is invalid';
            } else if (result.error.message.includes('email')) {
                this.alertMessage = 'Email is invalid'
            } else if (result.error.message.includes('password')) {
                this.alertMessage = 'Password is invalid';
            } else {
                this.alertMessage = result.error.message;
            }

            return false;
        },
        closeAlert() {
            this.alertMessage = '';
        },
        closeLogResult() {
            this.getResultServer = false;
        }
    },
    computed: mapGetters(['getResult']),
}
</script>

<style scoped>
.alert {
    width: 85%;
    height: 3rem;
    border: 1px solid #f22;
    border-radius: 3px;
    margin: 1rem auto;
    color: #fafafa;
    background-color: #f22;
}

.closeAlert {
    cursor: pointer;
    text-align: right;
}

.result {
    width: 80%;
    height: 3rem;
    border-radius: 3px;
    margin: 1rem auto;
    color: #fafafa;
    border: 1px solid #1D9AF2;
    background-color: #1D9AF2;
}

.closeLogResult {
    cursor: pointer;
    text-align: right;
}

.inputs {
    padding: 2rem 0.3rem;
    color: #fafafa;
}

button {
    color: #1D9AF2;
    background-color: #292D3E;
    border: 1px solid #1D9AF2;
    border-radius: 4px;
    padding: 0 15px;
    cursor: pointer;
    height:32px;
    font-size:14px;
    transition: all 0.2s ease-in-out;
}

button:hover {
    transform: scale(1.1);
}

.buttons {
    padding: 2rem 0;
}
</style>
