<template lang="html">
  <section class="container">
    <h1> {{ project.name }} </h1>
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'

export default {

  data() {
    return {
      project: projects[this.$route.params.slug]
    }
  },

  mounted() {

  }

}
</script>

<style lang="css">
</style>
