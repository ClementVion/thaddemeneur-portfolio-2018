<template>
  <section class="NextProject">
    <nuxt-link :to="'/projects/' + nextProject.slug" @click.native="changeProjectOnCanvas">
      <div class="NextProject__ImageContainer">
        <img :src="imageUrl" alt="" class="NextProject__Image">
      </div>
      <div class="NextProject__Background" ref="mask"></div>
    </nuxt-link>
  </section>
</template>

<script>
import projects from '~/static/data/projects.json';
import EventBus from '~/components/bus/EventBus.js';

export default {

  props: ['currentProject'],

  data() {
    return {
      projectsArray: [],
      nextProject: '',
      imageUrl: '',
      color: '',
    }
  },

  mounted() {
    this.convertProjectsToArray();
    this.getNextProject();
    this.imageUrl = this.nextProject.images.main;
    this.color = this.nextProject.color.substring(2);
    this.$refs.mask.style.backgroundColor = '#' + this.color;
  },

  methods: {

    convertProjectsToArray() {
      for (let key in projects) {
        if (!projects.hasOwnProperty(key)) continue;
        let project = projects[key];
        this.projectsArray.push(project);
      }
    },

    getNextProject() {
      if (this.currentProject.id + 1 >= this.projectsArray.length) {
        this.nextProject = this.projectsArray[0];
      } else {
        this.nextProject = this.projectsArray[this.currentProject.id + 1];
      }
    },

    changeProjectOnCanvas() {
      EventBus.$emit('changeProjectWithoutAnimation', {
        'currentProjectIndex': this.currentProject.id,
        'nextProjectIndex': this.nextProject.id,
      });
    }

  }

}
</script>

<style lang="scss">

  .NextProject {
    position: relative;
    height: 85vh;
    width: 100%;
    cursor: pointer;
    margin-top: 110px;
  }

  .NextProject__ImageContainer {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .NextProject__Image {
    max-height: 100%;
  }

  .NextProject__Background {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .page-leave-active .NextProject__Background {
    transition: 0.4s ease;
    // transform: scaleX(0.26);
  }

</style>
