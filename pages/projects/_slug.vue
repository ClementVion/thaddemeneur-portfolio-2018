<template lang="html">
  <section class="Project">

    <div class="Project__Hero">
      <!-- <h2 class="Project__Title" ref="title"> {{ project.title }} </h2> -->
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
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'
import Scroll from '~/mixins/Scroll.js';
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

export default {

  transition: {
    name: 'page',
    duration: 100,
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
    Islands
  },

  mixins: [Scroll],

  data() {
    return {
      project: projects[this.$route.params.slug],
    }
  },

  mounted() {
    this.$store.commit('change', projects[this.$route.params.slug].id);
    setTimeout(() => {
      EventBus.$emit('switchToProject');
    }, 100)
    // this.runParallax();
  },

  methods: {

    // runParallax() {
    //   requestAnimationFrame(this.runParallax);
    //
    //   const elm = this.$refs.title;
    //   let distance = Math.abs(this.scrollbar.scrollTop) * 0.3;
    //   elm.style.transform = 'translate3d(0,' + (-distance) + 'px,0)';
    // },

  }

}
</script>

<style lang="scss">

.Project {
  overflow: hidden;
}

.Project__Hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Project__Title {
  font-size: 8.4rem;
  font-weight: 600;
  z-index: 10;
  color: #FFF;
  text-align: center;
  /* margin-left: calc(50% - 232px); */
  white-space: nowrap;
}

.Project__Content {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #000;
  color: #FFF;
}

</style>
