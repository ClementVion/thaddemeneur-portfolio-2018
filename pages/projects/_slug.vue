<template lang="html">
  <section class="container">
    <h1>{{ data.name }}</h1>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  asyncData({ params, error }) {
    return axios.get(`http://localhost:3000/data/projects/${params.slug}.json`)
    .then((res) => {
      return {
        data: res.data,
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Project not found' })
    })
  },
  mounted() {
    console.log(this.data.slug);
  }
}
</script>

<style lang="css">
</style>
