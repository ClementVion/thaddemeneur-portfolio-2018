<template>
  <section class="Cover">
    <div class="Cover__Container">

      <img
        class="Cover__Image"
        :src="layout.image"
        alt="Project Screen"
        key="image"
        data-parallax="true"
        data-direction="up"
        data-speed="0.15">

    </div>
  </section>
</template>

<script>

export default {

  props: ['layout'],

}

</script>

<style lang="scss">

.Cover {
  height: 728px;
  overflow: hidden;
  margin: 110px 0;
}

.Cover__Image {
  max-width: 100%;
  margin-top: 200px;
}

</style>
