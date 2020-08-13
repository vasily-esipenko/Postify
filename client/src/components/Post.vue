<template>
    <div>
        <div class="post" v-for="message in getMessages" v-bind:key="message._id">
            <div class="post-header">
                <span>
                <img class="userpic" alt="userpic" src="https://via.placeholder.com/40">
                <span class="username">{{ message.username }}</span>
                </span>
            </div>
            <div class="post-body">
                <div class="post-subject">{{ message.subject }}</div>
                <p class="post-text">{{ message.message }}</p>
            </div>
            <div class="reaction-bar">
                <span> 
                    <Like /> 
                    <Share />
                    <span @click="addToSaved(message._id)"><Save/></span>
                    <span class="date"> {{ new Date(message.created).toLocaleDateString() }} </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Like from './buttons/Like.vue';
import Share from './buttons/Share.vue';
import Save from './buttons/Save.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'Post',
    data() {
        return {
            savedPosts: []
        }
    },
    computed: mapGetters(['getMessages']),
    methods: {
        ...mapActions(['fetchMessages', 'addToSavedPosts']),
        addToSaved(id) {
            const post = this.findPostbyId(id);
            if (post) {
                this.savedPosts.push(post);
                this.addToSavedPosts(this.savedPosts);
            } else {
                console.log('Something went wrong');
            }
        },
        findPostbyId(id) {
            for (let i = 0; i < this.getMessages.length; i++) {
                if (this.getMessages[i]._id == id) {
                    return this.getMessages[i];
                }
            }
        }
    },
    async mounted() {
        this.fetchMessages();
    },
    components: {
        Like,
        Share,
        Save,
    }
}
</script>

<style>
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
    margin-bottom: 1rem;
    width: 42%;
    border: 1px solid #777;
    border-radius: 3px;
    padding: 4px;
}

.username {
    display: inline;
    margin-left: 1rem;
    font-weight: 600;
    font-style: italic;
}

.post-body {
    text-align: left;
    border-bottom: 1px solid #777;
}

.post-subject {
    text-align: center;
    font-size: 20px;
    overflow-wrap: break-word;
}

.post-text {
    margin-top: 4px;
    font-size: 17px;
    overflow-wrap: break-word;
}

.reaction-bar {
    margin: 1rem 1.5rem 0;
    padding: 0;
    text-align: left;
}

.date {
    font-size: 15px;
    text-align: right;
    margin-left: 2rem;
}

@media (max-width: 990px) {
    .post {
        width: 64%;
    }
}

@media (max-width: 880px) {
    .post {
        width: 72%;
    }

    .post-header {
        width: 46%;
    }
}

@media (max-width: 770px) {
    .post {
        width: 80%;
    }
}

@media (max-width: 675px) {
    .post {
        width: 82%;
    }
    .post-header {
        width: 48%;
    }
}

@media (max-width: 575px) {
    .post {
        width: 90%;
    }

    .post-subject {
        font-size: 19px;
    }

    .post-text {
        font-size: 16px;
    }
}

@media (max-width: 415px) {
    .post {
        width: 96%;
    }

    .post-header {
        font-size: 12px;
        width: 60%;
    }

    .post-subject {
        font-size: 18px;
    }

    .post-text {
        font-size: 15px;
    }

    .date {
        font-size: 14px;
    }
}

@media (max-width: 330px) {
    .post {
        width: 100%;
    }

    .post-header {
        font-size: 11px;
    }

    .post-subject {
        font-size: 17px;
    }

    .post-text {
        font-size: 14px;
    }

    .date {
        font-size: 13px;
    }
}

</style>
