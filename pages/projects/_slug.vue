<template lang="html">
  <section class="container">
    <h1> {{ project.name }} </h1>
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
</style>
