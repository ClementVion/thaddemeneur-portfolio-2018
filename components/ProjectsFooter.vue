<template>
  <section class="ProjectsFooter u-home-container">
    <div class="ProjectsFooter__Container">

      <div class="ProjectsFooter__Progress">
        <div class="ProjectsFooter__ProgressSteps">
          <p class="CurrentStep"> {{ currentProjectIndex }} </p>
          <span> - </span>
          <p class="MaxStep"> {{ maxProjectIndex }} </p>
        </div>
        <div class="ProjectsFooter__ProgressBar">
          <div class="ProjectsFooter__ProgressBarSlide" ref="progressBarSlide"></div>
        </div>
      </div>

      <div class="ProjectsFooter__Cta">
        <p> Scroll down </p>
      </div>

    </div>
  </section>
</template>

<script>
  import EventBus from '~/components/bus/EventBus.js'

  export default {

    props: ['projects'],

    data() {
      return {
        projectsArray: [],
        currentProjectIndex: 0,
        maxProjectIndex: 0,
        progress: 0,
      }
    },

    mounted() {
      this.convertProjectsToArray();
      this.maxProjectIndex = this.projectsArray.length;
      this.updateIndexAndProgressBar(this.currentProjectIndex);
      this.listenGlobalEvents();
    },

    methods: {

      convertProjectsToArray() {
        for (let key in this.projects) {
          if (!this.projects.hasOwnProperty(key)) continue;
          let project = this.projects[key];
          this.projectsArray.push(project);
        }
      },

      listenGlobalEvents() {
        EventBus.$on('changeProject', ($event) => {
          this.updateIndexAndProgressBar($event.nextProjectIndex);
        })
      },

      updateIndexAndProgressBar(nextProjectIndex) {
        this.currentProjectIndex = (nextProjectIndex + 1);
        this.progress = (100 / this.maxProjectIndex) * this.currentProjectIndex;
        this.$refs.progressBarSlide.style.transform = 'translateX(' + (100 - this.progress) * (-1) + '%)';
      }

    },

  }

</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .ProjectsFooter {
    font-size: 1.6rem;
    font-weight: 600;
    position: fixed;
    bottom: 65px;
  }

  .ProjectsFooter__Container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .ProjectsFooter__Progress {
    display: flex;
    align-items: center;
  }

  .ProjectsFooter__ProgressSteps {
    display: flex;
    justify-content: space-between;
    width: 43px;
  }

  .ProjectsFooter__ProgressBar {
    position: relative;
    width: 200px;
    height: 2px;
    background: #CFCFCF;
    margin-left: 11px;
    overflow: hidden;
  }

  .ProjectsFooter__ProgressBarSlide {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: $black;
    transform: translateX(-100%);
    transition: transform ease 0.6s;
  }

  .ProjectsFooter__Cta {
    color: $grey;
  }

</style>
