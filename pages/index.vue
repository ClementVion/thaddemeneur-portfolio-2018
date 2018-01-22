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
import projects from '~/static/data/projects.json'

export default {

  data() {
    return {
      projects: projects,
    }
  },

  mounted() {

  },

  methods: {

  }

}
</script>

<style>
.Container {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}
</style>
