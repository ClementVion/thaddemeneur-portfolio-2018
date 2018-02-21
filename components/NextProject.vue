<template>
  <section class="NextProject">
    <div class="NextProject__Mask" ref="mask">
      <img :src="imageUrl" alt="" class="NextProject__Image">
    </div>
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'

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
    }

  }

}
</script>

<style lang="scss">

  .NextProject {
    height: 600px;
    width: 100%;
    cursor: pointer;
    margin-top: 110px;
  }

  .NextProject__Mask {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: flex-end;
  }

  .NextProject__Image {
    max-height: 100%;
  }

</style>
