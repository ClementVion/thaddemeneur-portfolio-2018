<template lang="html">
  <section class="Project">

    <div v-if="project.content" class="Project__content">
      <div class="Project__layouts">

        <div class="Project__layout" v-for="layout in project.content.layouts" :key="layout.id">

          <Infos v-if="layout.type === 'text'" :layout="layout" />
          <TripleScreens v-if="layout.type === 'tripleScreens'" :layout="layout" />
          <Cover v-if="layout.type === 'cover'" :layout="layout" />
          <Slider v-if="layout.type === 'slider'" :layout="layout" />
          <SliderParallax v-if="layout.type === 'sliderParallax'" :layout="layout" />
          <Thanks v-if="layout.type === 'thanks'" :layout="layout" />
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
import Cover from '~/components/layouts/Cover.vue'
import Slider from '~/components/layouts/Slider.vue'
import SliderParallax from '~/components/layouts/SliderParallax.vue'
import Thanks from '~/components/layouts/Thanks.vue'
import Islands from '~/components/layouts/customs/Islands.vue'

export default {

  transition: {
    name: 'page',
    duration: 500,
  },

  components: {
    Infos,
    TripleScreens,
    Cover,
    Slider,
    SliderParallax,
    Thanks,
    Islands
  },

  mixins: [Scroll],

  data() {
    return {
      project: projects[this.$route.params.slug]
    }
  },

  mounted() {
    this.$store.commit('change', projects[this.$route.params.slug].id);
    setTimeout(() => {
      EventBus.$emit('switchToProject');
    }, 500)
  }

}
</script>

<style lang="scss">

.Project {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  top: 100vh;
  background: #000;
  color: #FFF;
}

</style>
