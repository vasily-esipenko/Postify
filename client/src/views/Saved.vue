<template>
    <div>
        <div v-if="getVerifyResult">
            <h5>Your saved posts</h5>
            <hr>
            <div v-if="getSavedPosts.length">
                <div class="post" v-for="post in getSavedPosts" v-bind:key="post._id">
                    <div class="post-header">
                        <span>
                        <img class="userpic" alt="userpic" src="https://via.placeholder.com/40">
                        <span class="username">{{ post.username }}</span>
                        </span>
                    </div>
                    <div class="post-body">
                        <div class="post-subject">{{ post.subject }}</div>
                        <p class="post-text">{{ post.message }}</p>
                    </div>
                    <div class="reaction-bar">
                        <span> 
                        <span class="buttons">
                            <i class="far fa-heart"></i>
                            <i class="fas fa-share" id="share"></i>
                            <i class="fas fa-bookmark" id="save"></i>
                            <i class="fas fa-ban" id="remove" @click="removeSavedPost(post._id)"></i>
                        </span>
                        <span class="date"> {{ new Date(post.created).toLocaleDateString() }} </span>
                        </span>
                    </div>
                </div>
            </div>
            <div v-else>
            <p class="noposts">You have no saved posts right now</p>
            </div>
        </div>
        <div v-else>
            <AuthForm />
        </div>
    </div>
</template>

<script>
import AuthForm from '../components/auth/AuthForm.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'Saved',
    components: {
        AuthForm,
    },
    methods: {
        removeSavedPost(id) {
            const foundPostIndex = this.getSavedPosts.indexOf(this.findSavedPost(id));
            if (foundPostIndex >= 0) {
                this.getSavedPosts.splice(foundPostIndex, 1);
                localStorage.setItem("savedPosts", JSON.stringify(this.getSavedPosts));
                location.reload();
            }

        },
        findSavedPost(id) {
            for (let i = 0; i < this.getSavedPosts.length; i++) {
                if (this.getSavedPosts[i]._id == id) {
                    return this.getSavedPosts[i];
                }
            }
        }
    },
    computed: mapGetters(['getSavedPosts', 'getVerifyResult']),
}
</script>

<style scoped>

.buttons {
    font-size: 20px;
    color: #777;
    opacity: .8;
}

#share {
    margin-left: 2rem;
}

#save {
    margin-left: 2rem;
    color: #1D9AF2;
}

#remove {
    margin-left: 2rem;
    cursor: pointer;
    color: #fafafa;
    transition: all .1s linear;
}

#remove:hover {
    color: #f22;
    font-size: 18.2px;
}

.date {
    font-size: 15px;
    margin-left: 30rem;
    text-align: right;
}

.noposts {
    margin: 10rem auto 17rem;
    font-size: 16px;
}

@media (max-width: 415px) {
    .buttons {
        font-size: 18px;
    }
}
</style>
