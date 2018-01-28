<template>
  <section class="Home">
    <ProjectsInfos :projects="projects" />
    <ProjectsFooter :projects="projects" />
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'
import EventBus from '~/components/bus/EventBus.js'
import ProjectsInfos from '~/components/ProjectsInfos.vue'
import ProjectsFooter from '~/components/ProjectsFooter.vue'

export default {

  transition: {
    name: 'page',
    duration: 500,
  },

  components: {
    ProjectsInfos,
    ProjectsFooter,
  },

  data() {
    return {
      projects: projects,
      projectsArray: [],
      eventBus: EventBus,
      currentProjectIndex: 0,
      scrolling: false,
    }
  },

  mounted() {
    this.convertProjectsToArray();
    EventBus.$emit('switchToHome');
    this.initEvents();
    this.listenGlobalEvents();
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
            'currentProjectIndex': this.currentProjectIndex,
            'nextProjectIndex': nextProjectIndex,
          });
        }

        this.currentProjectIndex = nextProjectIndex;

        setTimeout(() => {
          this.scrolling = false;
        }, 3000)
      }
    },

    listenGlobalEvents() {
      EventBus.$on('clickedOnImage', ($event) => {
        this.routeToProject()
      });
    },

    routeToProject() {
      this.$router.push('/projects/' + this.projectsArray[this.currentProjectIndex].slug);
    },

    convertProjectsToArray() {
      for (let key in this.projects) {
        if (!this.projects.hasOwnProperty(key)) continue;
        let project = this.projects[key];
        this.projectsArray.push(project);
      }
    },

  }

}
</script>

<style lang="scss">
  .Home {
    background: #F5F5F5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
