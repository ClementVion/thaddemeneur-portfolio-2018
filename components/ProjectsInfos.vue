<template>
  <section class="ProjectsInfos u-home-container">

    <div class="ProjectsInfos__Container" ref="container">

      <p class="ProjectsInfos__Number"> {{ projectNumber }} </p>

      <h2 class="ProjectsInfos__Title"> {{ projectTitle }} </h2>

      <p class="ProjectsInfos__Desc">  {{ projectDesc }} </p>

      <div class="ProjectsInfos__Button" ref="button">
        <nuxt-link :to="'/projects/' + projectSlug">
          <Button text="View case study" />
        </nuxt-link>
      </div>

    </div>

  </section>
</template>

<script>
import Button from '~/components/utils/Button';
import EventBus from '~/components/bus/EventBus.js';

export default {

  props: ['projects'],

  data() {
    return {
      projectsArray: [],
      projectNumber: '',
      projectTitle: '',
      projectDesc: '',
      projectSlug: '',
    }
  },

  components: {
    Button,
  },

  mounted() {
    this.convertProjectsToArray();
    this.listenGlobalEvents();
    this.changeText(this.$store.state.currentProjectIndex);
    this.projectNumber = this.projectsArray[0].number;
    this.projectTitle = this.projectsArray[0].title;
    this.projectDesc = this.projectsArray[0].desc;
    this.projectSlug = this.projectsArray[0].slug;
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
        this.changeText($event.nextProjectIndex);
      })
    },

    changeText(nextProjectIndex) {
      if (this.$refs.container !== undefined && this.$refs.button !== undefined) { // Solve strange bug
        this.$refs.container.classList.remove('fade-in');
        this.$refs.button.classList.add('fade-out');

        setTimeout(() => {
          this.projectNumber = this.projectsArray[nextProjectIndex].number;
          this.projectTitle = this.projectsArray[nextProjectIndex].title;
          this.projectDesc = this.projectsArray[nextProjectIndex].desc;
          this.projectSlug = this.projectsArray[nextProjectIndex].slug;

          this.$nextTick(() => {
            this.$refs.container.classList.add('fade-in');
          })
          this.$refs.button.classList.remove('fade-out');
        }, 1000)
      }
    }

  },

}

</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.ProjectsInfos {
  z-index: 10;
}

.ProjectsInfos__Container {

  .ProjectsInfos__Number, .ProjectsInfos__Title, .ProjectsInfos__Desc {
    transform-origin: left;
    transition-timing-function: ease;
    transition-delay: 0;
    transition-duration: 0.3s;
    transform: rotate(-1deg) translate(0px, -20px);
    opacity: 0;
  }

  .ProjectsInfos__Number {
    transition-duration: 0.1s;
  }

  .ProjectsInfos__Title {
    transition-duration: 0.3s;
    transition-delay: 0.05s;
  }

  .ProjectsInfos__Desc {
    transition-duration: 0.3s;
    transition-delay: 0.1s;
  }

  &.fade-in .ProjectsInfos__Number,
  &.fade-in .ProjectsInfos__Title,
  &.fade-in .ProjectsInfos__Desc {
    transform: rotate(0deg) translate(0, 0);
    opacity: 1;
  }

  &.fade-in .ProjectsInfos__Number {
    transition-duration: 0.5s;
  }

  &.fade-in .ProjectsInfos__Title {
    transition-duration: 0.75s;
    transition-delay: 0.15s;
  }

  &.fade-in .ProjectsInfos__Desc {
    transition-duration: 0.75s;
    transition-delay: 0.2s;
  }
}

.ProjectsInfos__Number {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 27px;
}

.ProjectsInfos__Title {
  font-size: 4.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 6rem;
}

.ProjectsInfos__Desc {
  font-size: 2.1rem;
  color: $grey;
  max-width: 542px;
  line-height: 3rem;
  margin-bottom: 74px;

  &:before {
    content: '-';
    margin-right: 10px;
    opacity: 1;
    transition: opacity ease 0.6s 0.3s;
  }
}

.ProjectsInfos__Button {
  opacity: 1;
  transition: 0.6s 0.3s ease;

  a {
    color: #000;
    text-decoration: none;
  }

  &.fade-out {
    opacity: 0;
    transition: 0.3s ease;
  }
}

.page-leave-active .ProjectsInfos__Container .ProjectsInfos__Number,
.page-leave-active .ProjectsInfos__Container .ProjectsInfos__Title,
.page-leave-active .ProjectsInfos__Container .ProjectsInfos__Desc {
  transition-duration: 0.3s;
  transform: rotate(-1deg) translate(0px, -20px);
  opacity: 0;
}

.page-leave-active .ProjectsInfos__Button {
  opacity: 0;
  transition: 0.3s ease;
}

</style>
