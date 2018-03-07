<template lang="html">
  <section class="Video">
    <video ref="video" loop>
     <source
      v-for="(source, index) in layout.sources"
      :key="index"
      :src="source.url"
      :type="'video/' + source.type">
    </video>
  </section>
</template>

<script>

export default {

  props: ['layout'],

  data() {
    return {
      video: '',
    }
  },

  mounted() {
    this.video = this.$refs.video;
    this.detectAppearance();
  },

  methods: {

    detectAppearance() {
      let timer = setInterval(() => {
        const parent = this.video.closest('.videoParent');
        if (parent.classList.contains('appeared')) {
          this.video.play();
          clearInterval(timer);
        }
      }, 100)
    },

  }

}

</script>

<style lang="scss">

  .Video {
    min-height: 830px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #191919;
    margin: 100px 0 200px 0;
    // margin: 100px 0;
  }

  .Video video {
    max-width: 956px;
    width: 66%;
  }

</style>
