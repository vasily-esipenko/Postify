<template>
    <span class="like" @click="toggleLike">
        <span v-if="liked">
            <span class="liked">
            <i class="fas fa-heart"></i>
            </span>
        </span>
        <span v-else>
            <span class="notliked">
                <i class="far fa-heart"></i>
            </span>
        </span>
    </span>
</template>

<script>
export default {
    name: 'Like',
    data() {
        return {
            liked: false
        }
    },
    methods: {
        toggleLike() {
            this.liked = !this.liked;
        }
    }
}
</script>

<style scoped>
.like {
    font-size: 20px;
    cursor: pointer;
    transition: all .1s linear;
}

.like:hover {
    font-size: 18.2px;
    opacity: .9;
}

.liked {
    color: #f22;
}

.notliked {
    color: #fafafa;
}
</style>
