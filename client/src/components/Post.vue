<template>
    <div>
        <div class="post" v-for="message in getMessages" v-bind:key="message._id">
            <div class="post-header">
                <img class="userpic" alt="userpic" src="https://via.placeholder.com/40">
                <span class="username">{{ message.username }}</span>
            </div>
            <div class="post-body">
                <div class="post-subject">{{ message.subject }}</div>
                <p class="post-text">{{ message.message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'Post',
    computed: mapGetters(['getMessages']),
    methods: mapActions(['fetchMessages']),
    async mounted() {
        this.fetchMessages();
    }
}
</script>

<style scoped>
.post {
    width: 60%;
    height: auto;
    margin: 40px auto;
    padding: 1rem;
    border: 1px solid #777;
    border-radius: 3px;
    z-index: 1;
}

.post-header {
    text-align: left;
    font-size: 14px;
    margin-bottom: 4px;
}

.username {
    margin-left: 1rem;
    font-weight: 600;
    font-style: italic;
}

.post-body {
    text-align: left;
}

.post-subject {
    text-align: center;
    font-size: 18px;
}

.post-text {
    margin-top: 4px;
}

</style>
