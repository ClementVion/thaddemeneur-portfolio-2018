<template>
  <section class="Picture">
    <div class="Picture__Container">

      <img
        class="Picture__Image"
        :src="layout.image"
        alt="Project Picture"
        key="image">

    </div>
  </section>
</template>

<script>

export default {

  props: ['layout'],

}

</script>

<style lang="scss">

.Picture {
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Picture__Container {
  width: 90%;
  height: 630px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Picture__Image {
  height: 100%;
}

</style>
