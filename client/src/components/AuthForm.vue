<template>
    <div>
        <div class="auth">
            <h4 class="title">Sign up to write posts</h4>
            <div class="inputs">
                <input class="username grey-text text-lighten-5" type="text" placeholder="username" v-model="authForm.username">
                <input class="email grey-text text-lighten-5" type="email" placeholder="email" v-model="authForm.email">
                <input class="password grey-text text-lighten-5" type="password" placeholder="password" v-model="authForm.password">
                <input class="password grey-text text-lighten-5" type="password" placeholder="repeat password" v-model="repeat">
            </div>
            <span class="buttons">
                <button class="signup" @click="register">Sign Up</button>
                <button class="login" @click="login">Log in</button>    
            </span>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'AuthForm',
    data() {
        return {
            authForm: {
                username: "",
                email: "",
                password: ""
            },
            repeat: "",
        }
    },
    methods: {
        ...mapActions(['registerUser']),
        register() {
            if (this.validUser()) {
                this.registerUser(this.authForm);
                this.authForm.username = this.authForm.email = this.authForm.password = this.repeat ="";
            } else {
                alert(`Passwords doesn't match. Try again`);
            }
        
        },
        login() {

        },
        validUser() {
            if (this.authForm.password == this.repeat) {
                return true;
            } else {
                return false;
            }
        }
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

.login {
    margin-left: 2rem;
    color: #50e3c2;
    border: 1px solid #50e3c2;
}

</style>
