<template>
  <section class="Slider" ref="container">

    <div class="Slider__Track" ref="track">

      <img
        class="Slider__Slide"
        v-for="(slide, index) in layout.slides"
        :key="index"
        :src="slide"
        alt="Project image">

    </div>

  </section>

</template>

<script>
import {TweenMax} from 'gsap';
import Grab from '~/mixins/Grab.js';

export default {

  props: ['layout'],

  mixins: [Grab],

}

</script>

<style lang="scss">

.Slider {
  min-height: 630px;
  width: 100%;
  background: #191919;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: grab;
}

.Slider__Track {
  white-space: nowrap;
  user-select: none;
  display: block;
}

.Slider__Slide {
  display: inline-block;
  max-width: 750px;
  margin-left: 100px;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}


</style>
