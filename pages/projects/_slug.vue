<template lang="html">
  <section class="Container">
    <h1> {{ project.name }} </h1>
    <nuxt-link to="/"> Home </nuxt-link>
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'
import eventBus from '~/components/bus/eventBus.js'

export default {

  data() {
    return {
      project: projects[this.$route.params.slug]
    }
  },

  mounted() {
    eventBus.$emit('switchToProject');
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
