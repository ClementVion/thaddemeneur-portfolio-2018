<template>
  <section class="ProjectsInfos u-container">

    <div class="ProjectsInfos__container" :class="dir">

      <p class="ProjectsInfos__Number js-toSplit" :data-text="projectNumber"> </p>

      <h2 class="ProjectsInfos__Title js-toSplit" :data-text="projectTitle"> </h2>

      <p class="ProjectsInfos__Desc js-toSplit" ref="desc" :data-text="projectDesc"> </p>

      <div class="ProjectsInfos__Button" ref="button">
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

  props: ['projects', 'dir'],

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
      this.$refs.button.classList.add('fade-out');
      this.$refs.desc.classList.add('fade-out');
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
        this.$refs.button.classList.remove('fade-out');
        this.$refs.desc.classList.remove('fade-out');
      }, 1500);
    }

  }

}

</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.ProjectsInfos {
  display: flex;
  align-items: center;
}

.ProjectsInfos__container {
  max-width: 633px;
  margin-top: 30px;

  .js-toSplit .u-letter {
    display: inline-block;
    transition: ease 0.2s;
  }

  &.up .js-toSplit .u-letter {
    opacity: 0;
    transform: translateY(15px);

    &.fade-out {
      transform: translateY(-15px);
    }

    &.fade-in {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &.down .js-toSplit .u-letter {
    opacity: 0;
    transform: translateY(-15px);

    &.fade-out {
      transform: translateY(15px);
    }

    &.fade-in {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.ProjectsInfos__Number {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 27px;

  .u-letter.space {
    width: 4px;
  }
}

.ProjectsInfos__Title {
  font-size: 4.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 6rem;

  .u-letter.space {
    width: 16px;
  }
}

.ProjectsInfos__Desc {
  font-size: 2.5rem;
  color: $grey;
  max-width: 542px;
  line-height: 3.5rem;
  margin-bottom: 74px;

  &:before {
    content: '-';
    margin-right: 10px;
    opacity: 1;
    transition: opacity ease 0.6s 0.3s;
  }

  &.fade-out:before {
    opacity: 0;
    transition: opacity ease 0.3s;
  }

  .u-letter.space {
    width: 7px;
  }
}

.ProjectsInfos__Button {
  opacity: 1;
  transition: 0.8s 0.5s ease;

  &.fade-out {
    opacity: 0;
    transition: 0.6s ease;
  }
}

</style>
