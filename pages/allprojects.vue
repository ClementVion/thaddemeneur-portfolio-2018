<template>
  <section class="AllProjects">

    <div class="AllProjects__Content" ref="content">
      <ul class="AllProjects__Titles">
        <li
          v-for="(project, index) in projects"
          :key="index"
          class="AllProjects__Title">
          <span> <nuxt-link :to="'/projects/' + project.slug"> {{ project.title }} </nuxt-link> </span>
        </li>
      </ul>
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

        titles[i].addEventListener('mouseover', () => {
          EventBus.$emit('allProjectHover', {index: i});
        })

        titles[i].addEventListener('click', () => {
          EventBus.$emit('allProjectClick', {index: i});
          document.querySelector('.AllProjects__Content').classList.add('hidden');
          document.querySelector('.AllProjects__Overlay').classList.add('hidden');
        })

      }
    }

  }

}

</script>

<style lang="scss">

  .AllProjects {
    height: 100vh;
    display: flex;
    align-items: center;
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

  .AllProjects__Title {
    color: #FFF;
    font-size: 4.5rem;
    font-weight: bold;
    margin-bottom: 30px;
    cursor: pointer;
    transition: 0.5s ease;
    position: relative;

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
      transition: ease 0.3s;
    }

    span {
      transition: 0.5s ease;
      display: inline-block;

      a {
        text-decoration: none;
        transition: 0.5s ease;
        color: #4E4E4E;
      }
    }

    &:hover span {
      transform: translateX(66px);
      transition: 0.5s ease;
    }

    &:hover span a {
      transition: 0.5s ease;
      color: #FFF;
    }

    &:hover:before {
      transform: scaleX(1);
      transition: 0.5s ease;
      background: #FFF;
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
