<template lang="html">
  <section class="container">
    <h1> {{ project.name }} </h1>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  asyncData({ params, error }) {
    return axios.get(`http://localhost:3000/data/projects.json`)
    .then((res) => {
      return {
        project: res.data[params.slug]
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Project not found' })
    })
  },
  mounted() {

  }
}
</script>

<style lang="css">
</style>
