<template>
  <section class="FourScreens">

    <div class="FourScreens__Container">

      <img
        class="FourScreens__Image"
        v-for="(image, index) in layout.images"
        :src="image"
        :key="index">

    </div>

  </section>
</template>

<script>

export default {

  props: ['layout'],

}

</script>

<style lang="scss">

.FourScreens {
  height: 800px;
  display: flex;
  align-items: center;
}

.FourScreens__Container {
  max-width: 1264px;
  height: 630px;
  width: 90%;
  margin: auto;
  background: #191919;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-flow: wrap column;
}

.FourScreens__Image {
  width: 45%;
  max-width: 620px;
  margin: 10px 10px 10px 25px;
}

</style>
