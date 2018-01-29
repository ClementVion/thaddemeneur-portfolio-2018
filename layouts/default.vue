<template>
  <div class="Default">
    <div class="ScrollContainer">
      <Header />
      <GlobalCanvas :projects="projects" />
      <nuxt />
    </div>
  </div>
</template>

<script>
import projects from '~/static/data/projects.json';
import store from '~/store/index.js';
import Header from '~/components/Header.vue';
import GlobalCanvas from '~/components/GlobalCanvas.vue';

export default {

  data() {
    return {
      projects: projects,
    }
  },

  store,

  components: {
    'Header': Header,
    'GlobalCanvas': GlobalCanvas,
  },

  mounted() {

  }
}
</script>

<style>

  .ScrollContainer {
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }

</style>
