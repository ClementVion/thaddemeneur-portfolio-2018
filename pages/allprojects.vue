<template>
  <section class="AllProjects">

  </section>
</template>

<script>
import projects from '~/static/data/projects.json';
import EventBus from '~/components/bus/EventBus.js';

export default {

  beforeRouteEnter (to, from, next) {
    setTimeout(() => {
      EventBus.$emit('switchToAllProjects');
    }, 300);
    next();
  },

  transition: {
    name: 'page',
    duration: 1000,
  },

  mounted() {

  }

}

</script>

<style lang="scss">

</style>
