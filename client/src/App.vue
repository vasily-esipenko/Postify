<template>
  <div id="app">
        <Navbar />
        <router-view/>
        <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

export default {
  name: 'app',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import "~materialize-css/dist/css/materialize.min.css";

#app {
    text-align: center;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
    min-height: 100%;

    margin-bottom: -50px;
}
</style>
