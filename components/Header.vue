<template>
  <section class="Header u-home-container" ref="container">
    <div class="Header__Container">
      <nuxt-link class="Header__Title" to="/"> Thaddé Méneur </nuxt-link>
      <nuxt-link class="Header__About js-linkToHover" to="/about">About</nuxt-link>
    </div>
  </section>
</template>

<script>
import EventBus from '~/components/bus/EventBus';
import HoverLinks from '~/mixins/HoverLinks';

export default {

  mounted() {
    this.listenGlobalEvents();
    setTimeout(() => {
      this.$refs.container.classList.add('appeared');
    }, 100);
  },

  mixins: [HoverLinks],

  methods: {

    listenGlobalEvents() {
      EventBus.$on('switchToHome', ($event) => {
        this.$refs.container.classList.remove('project');
        this.$refs.container.classList.remove('about');
        this.$refs.container.classList.add('home');
      });

      EventBus.$on('switchToProject', ($event) => {
        this.$refs.container.classList.remove('home');
        this.$refs.container.classList.remove('about');
        this.$refs.container.classList.add('project');
      });

      EventBus.$on('switchToAbout', ($event) => {
        this.$refs.container.classList.remove('home');
        this.$refs.container.classList.remove('project');
        this.$refs.container.classList.add('about');
      });
    },
  }

}

</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.Header {
  position: fixed;
  top: 55px;
  z-index: 50;
  opacity: 0;

  &.appeared {
    transition: 0.3s 1s ease;
    opacity: 1;
  }

  @media screen and (max-width: 950px) {
    display: none;
  }
}

.Header.project {

  .Header__Title {
    color: #FFF;
  }

  .Header__About {
    transition: ease 0.3s;
    opacity: 0;
  }
}

.Header.about {

  .Header__About {
    transition: ease 0.3s;
    opacity: 0;
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
  text-decoration: none;
}

.Header__Title {
  transition: 0.3s 0.3s ease;
  color: $black;
}

.Header__About {
  transition: all ease 0.3s 1s, transform ease 0.3s;
  color: $grey;
  opacity: 1;

  &:hover {
    transform: rotate(-2deg);
    transition: transform ease 0.3s;
  }
}

</style>
