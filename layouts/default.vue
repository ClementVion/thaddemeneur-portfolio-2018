<template>
  <div class="Default">
    <div class="ScrollContainer">
      <Loader v-if="showLoader" />
      <Header v-if="!showLoader" />
      <GlobalCanvas :projects="projects" />
      <nuxt v-if="!showLoader" />
    </div>
  </div>
</template>

<script>
import projects from '~/static/data/projects.json';
import store from '~/store/index.js';
import EventBus from '~/components/bus/EventBus.js';
import Loader from '~/components/Loader.vue';
import Header from '~/components/Header.vue';
import GlobalCanvas from '~/components/GlobalCanvas.vue';

export default {

  data() {
    return {
      projects: projects,
      showLoader: true,
    }
  },

  store,

  components: {
    Header,
    GlobalCanvas,
    Loader
  },

  mounted() {
    EventBus.$on('loadingEnded', ($event) => {
      setTimeout(() => {
        this.showLoader = false;
        if (this.$route.name === 'index') {
          EventBus.$emit('switchToHome');
        }
      }, 500);
    })
  }

}
</script>

<style>

  .ScrollContainer {
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }

</style>
