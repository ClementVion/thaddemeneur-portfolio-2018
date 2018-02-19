<template>
  <section class="About">

  </section>
</template>

<script>
import EventBus from '~/components/bus/EventBus.js'

export default {

  beforeRouteEnter (to, from, next) {
    setTimeout(() => {
      EventBus.$emit('switchToAbout');
    }, 300);
    next();
  },

  transition: {
    name: 'page',
    duration: 500,
  },

}
</script>

<style lang="scss">

</style>
