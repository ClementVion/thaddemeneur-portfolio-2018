<template>
  <div class="default">
    <GlobalCanvas :projects="projects" />
    <nuxt />
  </div>
</template>

<script>
import projects from '~/static/data/projects.json'
import GlobalCanvas from '~/components/GlobalCanvas.vue';

export default {

  data() {
    return {
      projects: projects
    }
  },

  components: {
    'GlobalCanvas': GlobalCanvas,
  },

  mounted() {

  }
}
</script>
