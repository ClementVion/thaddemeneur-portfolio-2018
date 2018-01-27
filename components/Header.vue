<template>
  <section class="Header">
    <div class="u-container">
      <div class="Header__Container">
        <h1 class="Header__Title"> Thaddé Méneur </h1>
        <p class="Header__About"> About </p>
      </div>
    </div>
  </section>
</template>

<script>

export default {

}

</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.Header {
  position: fixed;
  width: 100%;
  top: 55px;
}

.Header__Container {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 600;
  width: 50%;
}

.Header__Title, .Header__About {
  cursor: pointer;
}

.Header__About {
  color: $grey;
}

</style>
