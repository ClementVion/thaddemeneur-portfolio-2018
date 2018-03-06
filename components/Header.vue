<template>
  <section class="Header u-home-container" ref="container">
    <div class="Header__Container">
      <div class="Header__Left">
        <nuxt-link class="Header__GoBack js-linkToHover" to="/">
          <svg width="24" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M.293 5.943l3.83-4.788a.957.957 0 0 1 1.494 1.197L3.031 5.584H16.36c3.285 0 6.723 2.149 6.723 5.745v1.915a.957.957 0 1 1-1.915 0V11.33c0-2.397-2.463-3.83-4.808-3.83H3.031l2.585 3.232a.957.957 0 1 1-1.494 1.197L.292 7.14a.96.96 0 0 1 0-1.197z" fill="#FFF" fill-rule="nonzero"/></svg>
          <span> Back home </span>
        </nuxt-link>
        <nuxt-link class="Header__Title" to="/"> Thaddé Méneur </nuxt-link>
      </div>
      <div class="Header__Right">
        <nuxt-link class="Header__AllProjects js-linkToHover" to="/allprojects">All Projects</nuxt-link>
        <nuxt-link class="Header__About js-linkToHover" to="/about">About</nuxt-link>
      </div>
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
        this.$refs.container.classList.remove('allprojects');
        this.$refs.container.classList.add('home');
      });

      EventBus.$on('switchToProject', ($event) => {
        this.$refs.container.classList.remove('home');
        this.$refs.container.classList.remove('about');
        this.$refs.container.classList.remove('allprojects');
        this.$refs.container.classList.add('project');
      });

      EventBus.$on('switchToAbout', ($event) => {
        this.$refs.container.classList.remove('home');
        this.$refs.container.classList.remove('project');
        this.$refs.container.classList.remove('allprojects');
        this.$refs.container.classList.add('about');
      });

      EventBus.$on('switchToAllProjects', ($event) => {
        this.$refs.container.classList.remove('home');
        this.$refs.container.classList.remove('project');
        this.$refs.container.classList.remove('about');
        this.$refs.container.classList.add('allprojects');
      });

      EventBus.$on('allProjectClick', ($event) => {
        this.$refs.container.classList.remove('home');
        this.$refs.container.classList.remove('about');
        this.$refs.container.classList.remove('allprojects');
        this.$refs.container.classList.add('project');
      })
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

.Header.project, .Header.allprojects  {

  .Header__Title {
    opacity: 0;
  }

  .Header__GoBack {
    opacity: 1;
    transition: ease 0.3s 0.5s;
  }

  .Header__Right {
    transition: ease 0.3s;
    opacity: 0;
  }
}

.Header.about {
  .Header__Right {
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

.Header__Left {
  position: relative;
  width: 130px;
}

.Header__Title {
  position: absolute;
  width: 100%;
  transition: 0.3s 0.3s ease;
  color: $black;
  text-decoration: none;
}

.Header__GoBack {
  position: absolute;
  z-index: 50;
  width: 100%;
  color: #FFF;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  opacity: 0;
  transition: ease 0.3s;

  &:hover {
    transform: rotate(-2deg);
    transition: transform ease 0.3s;
  }
}

.Header__Right {
  width: 179px;
  display: flex;
  justify-content: space-between;
  opacity: 1;
  transition: all ease 0.3s 1s, transform ease 0.3s;
}

.Header__AllProjects, .Header__About {
  color: $grey;
  text-decoration: none;

  &:hover {
    transform: rotate(-2deg);
    transition: transform ease 0.3s;
  }
}

</style>
