<template>
    <span class="share">
        <i class="fas fa-share"></i>
    </span>
</template>

<style scoped>
.share {
    margin-left: 2rem;
    font-size: 20px;
    cursor: pointer;
    transition: all .1s linear;
}

.share:hover {
    font-size: 18.2px;
    opacity: .9;
}

</style>

<script>
export default {
    name: 'ShareButton',
}
</script>
