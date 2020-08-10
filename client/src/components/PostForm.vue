<template>
    <div>
        <form class="postform" @submit.prevent="submit">
            <h6>Write your own post: </h6>

            <div class="alert" v-if="alertMessage" role="alert">
                {{alertMessage}}
            </div>

            <div v-if="message.subject.length <= 80">
                <input type="text" class="subject-input" placeholder="title" v-model="message.subject">
            </div>
            <div v-else>
                <input disabled type="text" class="subject-input grey-text text-lighten-5" v-model="message.subject">
            </div>

            <div v-if="maxChars > 0">
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
import Joi from 'joi';

const schema = Joi.object({
    subject: Joi.string().min(1).max(80).required(),
    message: Joi.string().min(1).max(500).required()
});

export default {
    name: 'PostForm',
    data() {
        return {
            message: {
                subject: "",
                message: ""
            },
            maxChars: 500,
            alertMessage: ""
        }
    },
    methods: {
        ...mapActions(['addMessage']),
        submit() {
            if (this.validMessage()) {
                this.addMessage(this.message);
                this.message.username = this.message.subject = this.message.message = "";
            }
        },
        validMessage() {
            const result = schema.validate(this.message);
            if (result.error == null) {
                return true;
            }

            if (result.error.message.includes('subject')) {
                this.alertMessage = 'Title is invalid';
            } else if (result.error.message.includes('message')) {
                this.alertMessage = 'Message is invalid';
            } else {
                this.alertMessage = 'Something went wrong. Try again, please';
            }

            return false;
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

.alert {
    width: 80%;
    height: 3rem;
    border: 1px solid #f22;
    border-radius: 3px;
    margin: 1rem auto;
    color: #fafafa;
    background-color: #f22;
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
