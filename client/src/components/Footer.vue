<template>
    <footer class="footer-copyright">
            <div class="container">
            Vasily Esipenko, 2020
            <a class="about-a about-a--footer" href="https://t.me/Vasily_Esipenko" target="_blank">
                <i class="fab fa-telegram"></i>
            </a>
            <a class="about-a about-a--footer" href="https://github.com/vasily-esipenko" target="_blank">
                <i class="fab fa-github"></i>
            </a>
            <a class="about-a about-a--footer" href="https://stackoverflow.com/users/13187161/vasily-esipenko?tab=profile" target="_blank">
                <i class="fab fa-stack-overflow"></i>
            </a>
            </div>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer-copyright {
    text-align: left;
    height: 60px;
    padding: 10px 0 0;
    position: relative;
    left: -15%;
    margin: 10px 0 0;
    font-size: 16px;
}

.about-a--footer {
    display: inline-flex;
    text-decoration: none;
    color: #fafafa;
    font-size: 16px;
    margin-left: 12px;
    transition: opacity .1s linear;
}

.about-a--footer:hover {
    opacity: .8;
}
</style>
