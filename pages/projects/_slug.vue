<template lang="html">
  <section class="Project">
    <h1> {{ project.name }} </h1>
    <nuxt-link to="/"> Home </nuxt-link>
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'
import EventBus from '~/components/bus/EventBus.js'

export default {

  transition: {
    name: 'page',
    duration: 500,
  },

  data() {
    return {
      project: projects[this.$route.params.slug]
    }
  },

  mounted() {
    setTimeout(() => {
      EventBus.$emit('switchToProject');
    }, 100)
  }

}
</script>

<style lang="css">
.Container {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}
</style>
