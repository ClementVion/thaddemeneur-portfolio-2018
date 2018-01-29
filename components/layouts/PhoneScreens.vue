<template>
  <section class="PhoneScreens">
    <div class="PhoneScreens__Container">
      <div class="PhoneScreens__Content">

        <img
          class="PhoneScreens__Image"
          v-for="(img, index) in layout.images"
          :src="img"
          alt="Project Screen"
          :key="index">

      </div>
    </div>
  </section>
</template>

<script>

export default {

  props: ['layout'],

}

</script>

<style lang="scss">

.PhoneScreens {
  min-height: 800px;
  display: flex;
  align-items: center;
}

.PhoneScreens__Container {
  height: 100%;
  max-width: 1264px;
  min-height: 630px;
  width: 90%;
  margin: auto;
  background: #191919;
  display: flex;
  justify-content: center;
  align-items: center;
}

.PhoneScreens__Content {
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.PhoneScreens__Image {
  max-width: 255px;
}

</style>
