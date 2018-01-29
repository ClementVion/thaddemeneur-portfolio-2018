<template lang="html">
  <section class="Project">

    <div class="Project__content">
      <div class="Project__layouts">

        <div class="Project__layout" v-for="layout in project.content.layouts" :key="layout.id">

          <Infos v-if="layout.type === 'text'" :layout="layout" />

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'
import EventBus from '~/components/bus/EventBus.js'
import Infos from '~/components/layouts/Infos.vue'

export default {

  transition: {
    name: 'page',
    duration: 500,
  },

  components: {
    Infos,
  },

  data() {
    return {
      project: projects[this.$route.params.slug]
    }
  },

  mounted() {
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
