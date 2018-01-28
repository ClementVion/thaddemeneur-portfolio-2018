<template>
  <section class="Header u-home-container" ref="container">
    <div class="Header__Container">
      <h1 class="Header__Title"> Thaddé Méneur </h1>
      <p class="Header__About"> About </p>
    </div>
  </section>
</template>

<script>
import EventBus from '~/components/bus/EventBus';

export default {

  mounted() {
    this.listenGlobalEvents();
  },

  methods: {

    listenGlobalEvents() {
      EventBus.$on('switchToProject', ($event) => {
        console.log('switch to project');
        this.$refs.container.classList.remove('home');
        this.$refs.container.classList.add('project');
      });

      EventBus.$on('switchToHome', ($event) => {
        this.$refs.container.classList.remove('project');
        this.$refs.container.classList.add('home');
      });
    }

  }

}

</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.Header {
  position: fixed;
  top: 55px;
  z-index: 10;
  transition: 0.3s 0.3s ease;

  &.project {
    color: #FFF;

    .Header__About {
      transition: ease 0.3s;
      opacity: 0;
    }
  }
}

.Header__Container {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
}

.Header__Title, .Header__About {
  cursor: pointer;
}

.Header__About {
  transition: ease 0.3s 1s;
  color: $grey;
}

</style>
