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
  height: 728px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Picture__Container {
  width: 90%;
}

.Picture__Image {
  width: 100%;
}

</style>
