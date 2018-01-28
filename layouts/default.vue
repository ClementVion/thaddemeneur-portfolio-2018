<template>
  <div class="Default">
    <Header />
    <GlobalCanvas :projects="projects" />
    <nuxt />
  </div>
</template>

<script>
import projects from '~/static/data/projects.json';
// import Worker from '~/mixins/Worker.js';
import Header from '~/components/Header.vue';
import GlobalCanvas from '~/components/GlobalCanvas.vue';
import store from '~/store/index.js';

export default {

  data() {
    return {
      projects: projects
    }
  },

  store,

  components: {
    'Header': Header,
    'GlobalCanvas': GlobalCanvas,
  },

  // mixins: [Worker],

  mounted() {
    
  }
}
</script>
