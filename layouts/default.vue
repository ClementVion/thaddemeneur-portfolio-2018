<template>
  <div class="Default">
    <Header />
    <GlobalCanvas :projects="projects" />
    <nuxt />
  </div>
</template>

<script>
import projects from '~/static/data/projects.json';
import Header from '~/components/Header.vue';
import GlobalCanvas from '~/components/GlobalCanvas.vue';

export default {

  data() {
    return {
      projects: projects
    }
  },

  components: {
    'Header': Header,
    'GlobalCanvas': GlobalCanvas,
  },

  mounted() {

  }
}
</script>
