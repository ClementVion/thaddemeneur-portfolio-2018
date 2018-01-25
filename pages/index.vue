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
      scrolling: false
    }
  },

  mounted() {
    eventBus.$emit('switchToHome');
    this.initEvents();
  },

  methods: {

    initEvents() {
      document.addEventListener('wheel', this.wheelEvent);
    },

    wheelEvent(e) {
      if (this.scrolling === false) {
        this.scrolling = true;

        const projectsLength = Object.keys(this.projects).length; // Could possibly create bugs
        let nextProjectIndex = undefined;
        if (e.deltaY > 0 && this.currentProjectIndex < (projectsLength - 1)) {
          nextProjectIndex = this.currentProjectIndex + 1;
        } else if (e.deltaY < 0 && this.currentProjectIndex > 0) {
          nextProjectIndex = this.currentProjectIndex - 1;
        } else if (this.currentProjectIndex >= (projectsLength - 1)) {
          nextProjectIndex = 0;
        } else if (this.currentProjectIndex <= 0) {
          nextProjectIndex = projectsLength - 1;
        }

        if (nextProjectIndex != undefined) {
          eventBus.$emit('changeProject', {
            'currentImageIndex': this.currentProjectIndex,
            'nextImageIndex': nextProjectIndex,
          });
        }

        this.currentProjectIndex = nextProjectIndex;

        setTimeout(() => {
          this.scrolling = false;
        }, 2000)
      }
    }

  }

}
</script>

<style>
html {
    overflow: hidden;
    height: 100%;
}

body {
    height: 100%;
    overflow: auto;
}

.Container {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}
</style>
