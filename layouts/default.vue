<template>
  <div class="Default">
    <div class="ScrollContainer">
      <Loader v-if="showLoader" />
      <Header v-if="!showLoader" />
      <GlobalCanvas :projects="projects" />
      <nuxt v-if="!showLoader" />
      <div class="Cursor" ref="cursor"></div>
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
import Cursor from '~/mixins/Cursor.js';

export default {

  data() {
    return {
      projects: projects,
      showLoader: true,
    }
  },

  mixins: [Cursor],

  store,

  components: {
    Header,
    GlobalCanvas,
    Loader
  },

  mounted() {
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
        }, 500);
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
  }

  .Cursor {
    display: none;
    position: fixed;
    top: 0;
    z-index: 10;
    width: 63px;
    height: 63px;
    background: #CCCCCC;
    opacity: 0.3;
    border-radius: 50px;
  }

</style>
