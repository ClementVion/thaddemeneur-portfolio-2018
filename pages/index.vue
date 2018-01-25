<template>
  <div class="Home">
    <section class="u-container">
      <ProjectsInfos />
      <!-- <ul>
        <li v-for="project in projects" :key="project.slug">
          <nuxt-link :to="'/projects/'+project.slug">
            {{ project.name }}
          </nuxt-link>
        </li>
      </ul> -->
    </section>
  </div>
</template>

<script>
import projects from '~/static/data/projects.json'
import EventBus from '~/components/bus/EventBus.js'
import ProjectsInfos from '~/components/ProjectInfos.vue'

export default {

  components: {
    ProjectsInfos,
  },

  data() {
    return {
      projects: projects,
      eventBus: EventBus,
      currentProjectIndex: 0,
      scrolling: false
    }
  },

  mounted() {
    EventBus.$emit('switchToHome');
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
          EventBus.$emit('changeProject', {
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

<style lang="scss">
  .Home {
    background: #F5F5F5;
  }
</style>
