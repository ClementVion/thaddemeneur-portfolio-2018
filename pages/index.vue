<template>
  <section class="Container">
    <ul>
      <li v-for="project in projects" :key="project.slug">
        <nuxt-link :to="'/projects/'+project.slug">
          {{ project.name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  asyncData({ params, error }) {
    return axios.get(`http://localhost:3000/data/projects.json`)
    .then((res) => {
      return {
        projects: res.data,
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Not found' })
    })
  },
  mounted() {
    console.log(this.projects);
  },
}
</script>

<style>
.Container {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}
</style>
