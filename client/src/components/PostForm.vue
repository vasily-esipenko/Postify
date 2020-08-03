<template>
    <div>
        <form class="postform" @submit.prevent="submit">
            <h6>Write your own post: </h6>
            <input type="text" class="username-input" placeholder="username" v-model="message.username">
            <input type="text" class="subject-input" placeholder="subject" v-model="message.subject" data-error="*subject is required">
            <textarea class="text-input" placeholder="Write your thoughts" v-model="message.message" data-error="*text is required"></textarea>
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
            }
        }
    },
    methods: {
        ...mapActions(['addMessage']),
        submit() {
            this.addMessage(this.message);
            this.message.username = this.message.subject = this.message.message = "";
        }
    },
}
</script>

<style scoped>
h6 {
    margin-bottom: 1rem;
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

input:focus {
    color: #1D9AF2;
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
    min-height: 30px;
    resize: vertical;
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
