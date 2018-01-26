<template>
  <section class="ProjectInfos u-container">

    <div class="ProjectInfos__container">

      <p class="ProjectInfos__Number js-toSplit" :data-text="projectNumber"> </p>

      <h2 class="ProjectInfos__Title js-toSplit" :data-text="projectTitle"> </h2>

      <p class="ProjectInfos__Desc js-toSplit" :data-text="projectDesc"> </p>

      <div class="ProjectInfos__Button">
        <Button text="View case study" />
      </div>

    </div>

  </section>
</template>

<script>
import Button from '~/components/utils/Button';
import TextSplitting from '~/mixins/TextSplitting'
import EventBus from '~/components/bus/EventBus.js'

export default {

  props: ['projects'],

  data() {
    return {
      projectsArray: [],
      projectNumber: 'First Story',
      projectTitle: 'My internship at Ming Labs',
      projectDesc: 'and the way we helped craftsmen be more efficient at work'
    }
  },

  components: {
    Button,
  },

  mixins: [TextSplitting],

  mounted() {
    this.convertProjectsToArray();
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
        this.changeText($event.nextProjectIndex);
      })
    },

    changeText(nextProjectIndex) {
      this.toggleLettersRandomly('fade-out');
      setTimeout(() => {
        this.projectNumber = this.projectsArray[nextProjectIndex].number;
        this.projectTitle = this.projectsArray[nextProjectIndex].title;
        this.projectDesc = this.projectsArray[nextProjectIndex].desc;
        this.$nextTick(() => {
          this.splitByLetters();
        });
      }, 1000);
      setTimeout(() => {
        this.toggleLettersRandomly('fade-in');
      }, 1500);
    }

  }

}

</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.ProjectInfos {
  display: flex;
  align-items: center;
}

.ProjectInfos__container {
  max-width: 633px;
  margin-top: -21px;
}

.ProjectInfos__Number {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 27px;
}

.ProjectInfos__Title {
  font-size: 4.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 6rem;
}

.ProjectInfos__Desc {
  font-size: 2.5rem;
  color: $grey;
  max-width: 542px;
  line-height: 3.5rem;
  margin-bottom: 74px;

  &:before {
    content: '-';
    margin-right: 10px;
  }
}

</style>
