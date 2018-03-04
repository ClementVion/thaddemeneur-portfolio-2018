<template>
  <section class="AllProjects">

    <div class="AllProjects__Header">
      <nuxt-link class="AllProjects__HeaderBack js-linkToHover" to="/">
      <!-- <div class="AllProjects__HeaderBack" @click="clickedOnGoBack"> -->
        <span> Back home </span>
        <svg width="24" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M.293 5.943l3.83-4.788a.957.957 0 0 1 1.494 1.197L3.031 5.584H16.36c3.285 0 6.723 2.149 6.723 5.745v1.915a.957.957 0 1 1-1.915 0V11.33c0-2.397-2.463-3.83-4.808-3.83H3.031l2.585 3.232a.957.957 0 1 1-1.494 1.197L.292 7.14a.96.96 0 0 1 0-1.197z" fill="#FFF" fill-rule="nonzero"/></svg>
      <!-- </div> -->
      </nuxt-link>
    </div>

    <div class="AllProjects__Container">

      <div class="AllProjects__Content" ref="content">
        <h4 class="AllProjects__Selected"> Selected Projects </h4>
        <ul class="AllProjects__Titles">
          <li
            v-for="(project, index) in projects"
            :key="index"
            class="AllProjects__Title">
            <nuxt-link class="AllProjects__TitleLink" :to="'/projects/' + project.slug"> {{ project.title }} </nuxt-link>
          </li>
        </ul>
      </div>

    </div>

    <div class="AllProjects__Overlay" ref="overlay"></div>

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

  data() {
    return {
      projects: projects,
      clickedOnProject: false,
    }
  },

  transition: {
    name: 'page',
    duration: 1000,
  },

  mounted() {
    this.listenHover();
  },

  methods: {

    listenHover() {
      const titles = document.querySelectorAll('.AllProjects__Title');

      for (let i = 0; i < titles.length; i += 1) {

        titles[i].addEventListener('mouseenter', () => {
          titles[i].classList.add('hover');
          EventBus.$emit('allProjectHover', {index: i});
        })

        titles[i].addEventListener('mouseout', () => {
          titles[i].classList.remove('hover');
        })

        titles[i].addEventListener('click', () => {
          this.clickedOnProject = true;
          EventBus.$emit('allProjectClick', {index: i});
          document.querySelector('.AllProjects__Content').classList.add('hidden');
          document.querySelector('.AllProjects__Overlay').classList.add('hidden');
        })

      }
    },

    clickedOnGoBack() {
      this.$router.go(-1);
    }

  },

  beforeRouteLeave(to, from, next) {
    // Handle browser previous button
    if (to.name === 'projects-slug' && this.clickedOnProject === false) {
      EventBus.$emit('allProjectClick', {index: this.$store.state.currentProjectIndex});
    }
    next();
  },

}

</script>

<style lang="scss">

  .AllProjects {
    height: 100vh;
  }

  .AllProjects__Header {
    position: fixed;
    top: 55px;
    right: 5%;
    z-index: 20;
  }

  .AllProjects__HeaderBack {
    color: #FFF;
    font-size: 1.5rem;
    font-weight: 600;
    width: 120px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    transition: transform ease 0.3s;

    &:hover {
      transform: rotate(-2deg);
      transition: transform ease 0.3s;
    }

    svg {
      transform: scaleX(-1);
    }
  }

  .page-enter-active .AllProjects__HeaderBack {
    transition: ease 0.3s 0.2s;
  }

  .page-leave-active .AllProjects__HeaderBack {
    transition: ease 0.3s;
  }

  .page-enter .AllProjects__HeaderBack,
  .page-leave-active .AllProjects__HeaderBack{
    opacity: 0;
  }

  .AllProjects__Container {
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 100;
  }

  .AllProjects__Content {
    z-index: 100;
    margin-left: 5%;
    transition: ease 0.3s;

    &.hidden {
      opacity: 0;
      transition: ease 0.3s;
    }
  }

  .AllProjects__Selected {
    font-size: 1.6rem;
    font-weight: 600;
    color: #FFF;
    margin-bottom: 50px;
  }

  .page-enter-active .AllProjects__Selected {
    transition: ease 0.3s;
  }

  .page-leave-active .AllProjects__Selected {
    transition: ease 0.3s;
  }

  .page-enter .AllProjects__Selected,
  .page-leave-active .AllProjects__Selected{
    opacity: 0;
  }

  .AllProjects__Title {
    position: relative;
    width: 100%;
    color: #FFF;
    font-size: 4.5rem;
    font-weight: bold;
    margin-bottom: 30px;
    cursor: pointer;
    transition: 0.5s ease;

    &:before {
      content: '';
      position: absolute;
      width: 46px;
      height: 4px;
      left: 0px;
      bottom: 17px;
      background: #4E4E4E;
      transform: scaleX(0);
      transform-origin: left center;
      transition: 0.5s ease;
    }

    &.hover:before {
      transform: scaleX(1);
      transition-property: transform;
      transition-duration: 0.5s;
      transition-timing-function: ease;
      background: #FFF;
    }

    &.hover .AllProjects__TitleLink {
      transform: translateX(66px);
      color: #FFF;
      transition: 0.5s ease;
    }
  }

  .AllProjects__TitleLink {
    display: block;
    // position: absolute;
    width: 100%;
    text-decoration: none;
    color: #4E4E4E;
    transform: translateX(0px);
    transition: 0.5s ease;
  }

  .page-enter-active .AllProjects__Title {
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  .page-leave-active .AllProjects__Title {
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  .page-enter .AllProjects__Title,
  .page-leave-active .AllProjects__Title{
    opacity: 0;
    transform: translateY(30px);
  }

  @for $i from 1 to 100 {
    .AllProjects__Titles .AllProjects__Title:nth-child(#{$i}) {
      transition-delay: $i * 0.05s;
    }
  }

  .AllProjects__Overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.7);

    &.hidden {
      opacity: 0;
      transition: 0.2s ease;
    }
  }

</style>
