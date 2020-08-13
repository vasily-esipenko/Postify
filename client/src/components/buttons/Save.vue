<template>
    <span class="save" @click="toggleSave">
        <span v-if="saved">
            <span class="saved">
                <i class="fas fa-bookmark"></i>
            </span>
        </span>
        <span v-else>
            <span class="notsaved">
                <i class="far fa-bookmark"></i>
            </span>
        </span>
    </span>
</template>

<script>
export default {
    name: 'Share',
    data() {
        return {
            saved: false
        }
    },
    methods: {
        toggleSave() {
            this.saved = !this.saved;
        }
    }
}
</script>

<style scoped>
.save {
    font-size: 20px;
    margin-left: 2rem;
    cursor: pointer;
    transition: all .1s linear;
}

.save:hover {
    font-size: 18.2px;
    opacity: .9;
}

.saved {
    color: #1D9AF2;
}

.notsaved {
    color: #fafafa;
}

@media (max-width: 415px) {
    .save {
        font-size: 18px;
    }
}

</style>
