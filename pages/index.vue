<template>
  <section class="Home">
    <ProjectsInfos :projects="projects" :dir="dir" />
    <ProjectsFooter :projects="projects" />
    <!-- <ul>
      <li v-for="project in projects" :key="project.slug">
        <nuxt-link :to="'/projects/'+project.slug">
          {{ project.name }}
        </nuxt-link>
      </li>
    </ul> -->
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'
import EventBus from '~/components/bus/EventBus.js'
import ProjectsInfos from '~/components/ProjectsInfos.vue'
import ProjectsFooter from '~/components/ProjectsFooter.vue'

export default {

  components: {
    ProjectsInfos,
    ProjectsFooter,
  },

  data() {
    return {
      projects: projects,
      eventBus: EventBus,
      currentProjectIndex: 0,
      scrolling: false,
      dir: ''
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
          this.dir = 'up';
        } else if (e.deltaY < 0 && this.currentProjectIndex > 0) {
          nextProjectIndex = this.currentProjectIndex - 1;
          this.dir = 'down';
        } else if (this.currentProjectIndex >= (projectsLength - 1)) {
          nextProjectIndex = 0;
          this.dir = 'up';
        } else if (this.currentProjectIndex <= 0) {
          nextProjectIndex = projectsLength - 1;
          this.dir = 'down';
        }


        if (nextProjectIndex != undefined) {
          EventBus.$emit('changeProject', {
            'currentProjectIndex': this.currentProjectIndex,
            'nextProjectIndex': nextProjectIndex,
          });
        }

        this.currentProjectIndex = nextProjectIndex;

        setTimeout(() => {
          this.scrolling = false;
        }, 3000)
      }
    }

  }

}
</script>

<style lang="scss">
  .Home {
    background: #F5F5F5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
