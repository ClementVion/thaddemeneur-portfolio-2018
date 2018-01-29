<template lang="html">
  <section class="Project">

    <div v-if="project.content" class="Project__content">
      <div class="Project__layouts">

        <div class="Project__layout" v-for="layout in project.content.layouts" :key="layout.id">

          <Infos v-if="layout.type === 'text'" :layout="layout" />
          <PhoneScreens v-if="layout.type === 'phoneScreens'" :layout="layout" />

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import projects from '~/static/data/projects.json'
import EventBus from '~/components/bus/EventBus.js'
import Infos from '~/components/layouts/Infos.vue'
import PhoneScreens from '~/components/layouts/PhoneScreens.vue'

export default {

  transition: {
    name: 'page',
    duration: 500,
  },

  components: {
    Infos,
    PhoneScreens
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
