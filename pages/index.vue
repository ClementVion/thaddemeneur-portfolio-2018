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
import eventBus from '~/components/bus/eventBus.js'

export default {

  data() {
    return {
      projects: projects,
      eventBus: eventBus,
      currentProjectIndex: 0,
    }
  },

  mounted() {
    eventBus.$emit('switchToHome');
    window.addEventListener('click', () => {
      const nextProjectIndex = this.currentProjectIndex + 1;
      eventBus.$emit('changeProject', {
        'currentImageIndex': this.currentProjectIndex,
        'nextImageIndex': nextProjectIndex,
      });
      this.currentProjectIndex = nextProjectIndex;
    })
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
