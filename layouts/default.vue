<template>
  <div class="Default">
    <Mobile />
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
import Mobile from '~/components/Mobile.vue';
import GlobalCanvas from '~/components/GlobalCanvas.vue';
import TextSplit from '~/mixins/TextSplit.js';

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
    Loader,
    Mobile
  },

  mixins: [TextSplit],

  mounted() {
    if (this.$route.name === 'allprojects') {
      this.$router.replace('/');
    }
    this.listenLoadingEnd();
  },

  methods: {

    listenLoadingEnd() {
      EventBus.$on('loadingEnded', ($event) => {
        setTimeout(() => {
          this.showLoader = false;
          if (this.$route.name === 'index') {
            EventBus.$emit('updateCanvas');
            EventBus.$emit('switchToHome');
          } else if (this.$route.name === 'projects-slug') {
            EventBus.$emit('switchToProject');
            EventBus.$emit('updateCanvas');
          } else if (this.$route.name === 'about') {
            EventBus.$emit('switchToAbout');
            EventBus.$emit('updateCanvas');
          }
        }, 1000);
      })
    }

  }

}
</script>

<style>

  .ScrollContainer {
    width: 100vw;
    height: 100vh;
    overflow: auto;

    @media screen and (max-width: 950px) {
      display: none;
    }
  }

</style>
