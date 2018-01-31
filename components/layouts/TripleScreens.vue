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
  height: 800px;
  display: flex;
  align-items: center;
}

.PhoneScreens__Container {
  max-width: 1264px;
  height: 630px;
  width: 90%;
  margin: auto;
  background: #191919;
  display: flex;
  justify-content: center;
  align-items: center;
}

.PhoneScreens__Content {
  width: 95%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.PhoneScreens__Image {
  max-height: 90%;
  margin-right: 50px;

  &:last-child {
    margin-right: 0;
  }
}

</style>
