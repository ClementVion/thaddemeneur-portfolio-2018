<template lang="html">
  <section class="Project">

    <div class="Project__Header">
      <div class="Project__HeaderBack" @click="clickedOnGoBack()">
        <svg width="24" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M.293 5.943l3.83-4.788a.957.957 0 0 1 1.494 1.197L3.031 5.584H16.36c3.285 0 6.723 2.149 6.723 5.745v1.915a.957.957 0 1 1-1.915 0V11.33c0-2.397-2.463-3.83-4.808-3.83H3.031l2.585 3.232a.957.957 0 1 1-1.494 1.197L.292 7.14a.96.96 0 0 1 0-1.197z" fill="#FFF" fill-rule="nonzero"/></svg>
        <span> Go back </span>
      </div>
    </div>

    <div class="Project__Hero">
      <h2 class="Project__Title js-toSplit" :data-text="project.title" ref="title"> </h2>
    </div>

    <div class="Project__HeroFooter js-hideOnScroll">
      <div class="Project__HeroFooterContainer">
        <img src="/images/rounded-arrow.svg" alt="Scroll down arrow">
        <p class="Project__HeroFooterCta"> Scroll down </p>
      </div>
    </div>

    <div v-if="project.content" class="Project__Content">
      <div class="Project__layouts">

        <div class="Project__layout" v-for="layout in project.content.layouts" :key="layout.id">

          <Infos v-if="layout.type === 'text'" :layout="layout" />
          <TripleScreens v-if="layout.type === 'tripleScreens'" :layout="layout" />
          <FourScreens v-if="layout.type === 'fourScreens'" :layout="layout" />
          <Cover v-if="layout.type === 'cover'" :layout="layout" />
          <Slider v-if="layout.type === 'slider'" :layout="layout" />
          <SliderParallax v-if="layout.type === 'sliderParallax'" :layout="layout" />
          <Thanks v-if="layout.type === 'thanks'" :layout="layout" />
          <Picture v-if="layout.type === 'picture'" :layout="layout" />
          <Islands v-if="layout.type === 'custom' && layout.name === 'islands'" :layout="layout" />

        </div>

      </div>
    </div>

    <NextProject :currentProject="project" />

  </section>
</template>

<script>
import projects from '~/static/data/projects.json'
import Scroll from '~/mixins/Scroll.js';
import TextSplit from '~/mixins/TextSplit.js';
import EventBus from '~/components/bus/EventBus.js'
import Infos from '~/components/layouts/Infos.vue'
import TripleScreens from '~/components/layouts/TripleScreens.vue'
import FourScreens from '~/components/layouts/FourScreens.vue'
import Cover from '~/components/layouts/Cover.vue'
import Slider from '~/components/layouts/Slider.vue'
import SliderParallax from '~/components/layouts/SliderParallax.vue'
import Thanks from '~/components/layouts/Thanks.vue'
import Picture from '~/components/layouts/Picture.vue'
import Islands from '~/components/layouts/customs/Islands.vue'
import NextProject from '~/components/NextProject.vue'

export default {

  beforeRouteEnter (to, from, next) {
    setTimeout(() => {
      EventBus.$emit('switchToProject');
    }, 300);
    next();
  },

  transition: {
    name: 'page',
    duration: 500,
  },

  components: {
    Infos,
    TripleScreens,
    FourScreens,
    Cover,
    Slider,
    SliderParallax,
    Thanks,
    Picture,
    Islands,
    NextProject
  },

  mixins: [Scroll, TextSplit],

  data() {
    return {
      project: projects[this.$route.params.slug],
    }
  },

  mounted() {
    this.$store.commit('change', projects[this.$route.params.slug].id);
    this.runParallax();
  },

  methods: {

    runParallax() {
      this.parallaxAnimationId = requestAnimationFrame(this.runParallax);

      const elm = this.$refs.title;
      if (elm) {
        let distanceX = Math.abs(this.scrollbar.scrollTop) * 1;
        let distanceY = Math.abs(this.scrollbar.scrollTop) * 0.2;
        elm.style.transform = 'translate3d(' + (-distanceX) + 'px,' + (distanceY) + 'px,0)';
      }
    },

    clickedOnGoBack() {
      this.$router.go(-1);
    }

  },


}
</script>

<style lang="scss">

.Project {
  overflow: hidden;
  background: #000;
}

.Project__Header {
  position: fixed;
  top: 55px;
  right: 5%;
  z-index: 10;
}

.Project__HeaderBack {
  color: #FFF;
  font-size: 1.5rem;
  font-weight: 600;
  width: 104px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-enter-active .Project__HeaderBack {
  transition: ease 0.3s 0.2s;
}

.page-leave-active .Project__HeaderBack {
  transition: ease 0.3s;
}

.page-enter .Project__HeaderBack,
.page-leave-active .Project__HeaderBack{
  opacity: 0;
}

.Project__Hero {
  height: 100vh;
  width: 100%;
  position: relative;
  margin-bottom: 84px;
}

.Project__Title {
  position: absolute;
  width: 100%;
  font-size: 10.4rem;
  font-weight: 600;
  z-index: 10;
  color: #FFF;
  left: calc(50% - 228px);
  top: calc(50% - 52px);
  height: 104px;
  white-space: nowrap;
}

.Project__Title .letter {
  display: inline-block;

  &.space {
    width: 35px;
  }
}

.page-enter-active .Project__Title .letter,
.page-leave-active .Project__Title .letter {
  transition-duration: 0.4s;
  transition-timing-function: ease;
}

.page-enter .Project__Title .letter,
.page-leave-active .Project__Title .letter{
  opacity: 0;
  transform: translateY(50%);
}

$delay: 15;
@for $i from 1 to 100 {
  .letter:nth-child(#{$i}) {
    transition-delay: ($i + $delay) * 0.02s;
  }
  .page-leave-active .letter:nth-child(#{$i}) {
    transition-delay: $i * 0.02s;
  }
}

.Project__HeroFooter {
  position: fixed;
  width: 100%;
  top: 84vh;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.3s ease;

  &.hidden {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.Project__HeroFooterContainer {
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Project__HeroFooterCta {
  color: #FFF;
  font-size: 1.5rem;
  font-weight: 600;
}

.page-enter-active .Project__HeroFooter {
  transition: ease 0.3s 0.2s;
}

.page-leave-active .Project__HeroFooter {
  transition: ease 0.3s;
}

.page-enter .Project__HeroFooter,
.page-leave-active .Project__HeroFooter{
  opacity: 0;
}

.Project__Content {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #000;
  color: #FFF;
}

</style>
