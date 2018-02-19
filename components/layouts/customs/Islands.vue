<template>
  <section class="Islands">
    <div class="Islands__Container">
      <div class="Islands__Left Islands__Side">

        <div class="Islands__SideContainer">
          <img class="Islands__Image Islands__Image--01" src="/images/projects/minglabs/islands/left/01-top.svg">
          <img class="Islands__Shadow Islands__Shadow--01" src="/images/projects/minglabs/islands/left/01-shadow.svg">
          <img class="Islands__Image Islands__Image--02" src="/images/projects/minglabs/islands/left/02-top.svg">
          <img class="Islands__Shadow Islands__Shadow--02" src="/images/projects/minglabs/islands/left/02-shadow.svg">
          <img class="Islands__Image Islands__Image--03" src="/images/projects/minglabs/islands/left/03-top.svg">
          <img class="Islands__Shadow Islands__Shadow--03" src="/images/projects/minglabs/islands/left/03-shadow.svg">
          <img class="Islands__Image Islands__Image--04" src="/images/projects/minglabs/islands/left/04-top.svg">
          <img class="Islands__Shadow Islands__Shadow--04" src="/images/projects/minglabs/islands/left/04-shadow.svg">
          <img class="Islands__Image Islands__Image--05" src="/images/projects/minglabs/islands/left/05-top.svg">
          <img class="Islands__Shadow Islands__Shadow--05" src="/images/projects/minglabs/islands/left/05-shadow.svg">
          <img class="Islands__Image Islands__Image--06" src="/images/projects/minglabs/islands/left/06-top.svg">
          <img class="Islands__Shadow Islands__Shadow--06" src="/images/projects/minglabs/islands/left/06-shadow.svg">
        </div>

      </div>
      <div class="Islands__Right Islands__Side">

        <div class="Islands__SideContainer">
          <img class="Islands__Image Islands__Image--01" src="/images/projects/minglabs/islands/right/01-top.svg">
          <img class="Islands__Shadow Islands__Shadow--01" src="/images/projects/minglabs/islands/right/01-shadow.svg">
          <img class="Islands__Image Islands__Image--02" src="/images/projects/minglabs/islands/right/02-top.svg">
          <img class="Islands__Shadow Islands__Shadow--02" src="/images/projects/minglabs/islands/right/02-shadow.svg">
          <img class="Islands__Image Islands__Image--03" src="/images/projects/minglabs/islands/right/03-top.svg">
          <img class="Islands__Shadow Islands__Shadow--03" src="/images/projects/minglabs/islands/right/03-shadow.svg">
          <img class="Islands__Image Islands__Image--04" src="/images/projects/minglabs/islands/right/04-top.svg">
          <img class="Islands__Shadow Islands__Shadow--04" src="/images/projects/minglabs/islands/right/04-shadow.svg">
          <img class="Islands__Image Islands__Image--05" src="/images/projects/minglabs/islands/right/05-top.svg">
          <img class="Islands__Shadow Islands__Shadow--05" src="/images/projects/minglabs/islands/right/05-shadow.svg">
          <img class="Islands__Image Islands__Image--06" src="/images/projects/minglabs/islands/right/06-top.svg">
          <img class="Islands__Shadow Islands__Shadow--06" src="/images/projects/minglabs/islands/right/06-shadow.svg">
        </div>

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

.Islands {
  min-height: 800px;
  display: flex;
  align-items: center;
}

.Islands__Container {
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

.Islands__Side {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Islands__SideContainer {
  width: 410px;
  height: 380px;
  position: relative;
}

.Islands__Image {
  position: absolute;
  z-index: 10;
  transform: translateY(0);
  animation-name: move-island;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.27, 0.01, 0.65, 1.01);
}

.Islands__Shadow {
  position: absolute;
  z-index: 0;
  animation-name: move-shadow;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.27, 0.01, 0.65, 1.01);
}

.Islands__Left .Islands__Image {

  &--01 {
    top: 0px;
    left: 120px;
  }
  &--02 {
    top: 140px;
    left: 0px;
  }
  &--03 {
    top: 110px;
    left: 105px;
  }
  &--04 {
    top: 100px;
    right: -10px;
  }
  &--05 {
    top: 220px;
    right: 60px;
  }
  &--06 {
    bottom: 45px;
    right: 180px;
  }
}

.Islands__Left .Islands__Shadow {
  &--01 {
    top: 120px;
    left: 130px;
  }
  &--02 {
    top: 200px;
    left: 0px;
  }
  &--03 {
    top: 210px;
    left: 95px;
  }
  &--04 {
    top: 240px;
    right: -20px;
  }
  &--05 {
    top: 285px;
    right: 50px;
  }
  &--06 {
    bottom: -20px;
    right: 170px;
  }
}

.Islands__Right .Islands__Image {

  &--01 {
    top: 0px;
    left: 120px;
  }
  &--02 {
    top: 100px;
    left: 10px;
  }
  &--03 {
    top: 140px;
    left: 75px;
  }
  &--04 {
    top: 200px;
    right: 10px;
  }
  &--05 {
    top: 150px;
    right: 60px;
  }
  &--06 {
    bottom: 30px;
    right: 190px;
  }
}

.Islands__Right .Islands__Shadow {
  &--01 {
    top: 160px;
    left: 130px;
  }
  &--02 {
    top: 240px;
    left: 0px;
  }
  &--03 {
    top: 210px;
    left: 60px;
  }
  &--04 {
    top: 270px;
    right: 10px;
  }
  &--05 {
    top: 310px;
    right: 80px;
  }
  &--06 {
    bottom: -40px;
    right: 190px;
  }
}

$delay: 1;
@for $i from 1 to 100 {
  .Islands__Image--0#{$i} {
    animation-delay: ($delay + $i) * 0.2s;
  }
  .Islands__Shadow--0#{$i} {
    animation-delay: ($delay + $i) * 0.2s;
  }
}

@keyframes move-island {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes move-shadow {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(0, 10px) scale(0.95);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

</style>
