<template>
    <div>
        <form class="postform" @submit.prevent="submit">
            <h6>Write your own post: </h6>

            <div v-if="message.username.length <= 30">
                <input type="text" class="username-input" placeholder="username" v-model="message.username">
            </div>
            <div v-else>
                <input disabled type="text" class="username-input grey-text text-lighten-5" v-model="message.username">
            </div>

            <div v-if="message.subject.length <= 80">
                <input type="text" class="subject-input" placeholder="subject" v-model="message.subject">
            </div>
            <div v-else>
                <input disabled type="text" class="subject-input grey-text text-lighten-5" v-model="message.subject">
            </div>

            <div v-if="charLeft > 0">
            <textarea class="text-input" placeholder=" Write your thoughts" v-model="message.message"></textarea>
            </div>
            <div v-else>
                <textarea disabled class="text-input" v-model="message.message"></textarea>
            </div>

            <div class="char-left">Characters left: {{ charLeft }}</div>

            <button class="post-btn" type="submit">Write</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'PostForm',
    data() {
        return {
            message: {
                username: "",
                subject: "",
                message: ""
            },
            maxChars: 500
        }
    },
    methods: {
        ...mapActions(['addMessage']),
        submit() {
            if (this.checkLength()) {
                this.addMessage(this.message);
                this.message.username = this.message.subject = this.message.message = "";
            } else {
                alert('Sorry, too many characters. \nTry again, please.');
            }
        },
        checkLength() {
            if (this.message.username.length <= 30 && this.message.subject.length <= 50 && this.message.message.length <= 500) {
                return true;
            } else {
                return false;
            }
        }
    },
    computed: {
        charLeft() {
            return this.maxChars - this.message.message.length;
        },
    }
}
</script>

<style scoped>

h6 {
    margin-bottom: 1rem;
}

.char-left {
    text-align: left;
    font-weight: 300;
    color: #ccc;
    margin-left: 1rem;
}

.postform {
    width: 60%;
    height: auto;
    margin: 20px auto;
    padding: 1rem;
    border: 1px solid #555;
    border-radius: 3px;
}

.username-input {
    width: 40%;
    height: 30px;
    font-weight: 400;
    color: #fafafa;
    border: 1px solid #555;
    border-radius: 3px;
}

.subject-input {
    width: 100%;
    height: 30px;
    font-weight: 400;
    color: #fafafa;
    border: 1px solid #555;
    border-radius: 3px;
}

.text-input {
    margin-top: 1rem;
    width: 100%;
    height: 120px;
    resize: none;
    font-weight: 500;
    color: #fafafa;
    border: 1px solid #555;
    border-radius: 3px;
}

.post-btn {
    margin-top: 15px;
    color: #1D9AF2;
    background-color: #292D3E;
    border: 1px solid #1D9AF2;
    border-radius: 4px;
    padding: 0 15px;
    cursor: pointer;
    height: 32px;
    font-size: 14px;
    transition: all 0.2s ease-in-out;
}

.post-btn:hover {
    transform: scale(1.1);
}

</style>
