<template>
  <section class="SliderParallax" ref="container">

    <div class="SliderParallax__Track" ref="track">

      <div class="SliderParallax__Slide" v-for="(slide, index) in layout.slides" :key="index">

        <img
          class="SliderParallax__SlideImage"
          :src="slide.image"
          alt="Project image"
          ref="images"
          data-direction="left"
          :data-speed="0.15">

        <div class="SliderParallax__SlideInfos">
          <h4 class="SliderParallax__SlideTitle"> {{ slide.title }} </h4>
          <p class="SliderParallax__SlideDesc"> {{ slide.desc }} </p>
        </div>

        <div class="SliderParallax__SlideBg"></div>

      </div>

    </div>

  </section>

</template>

<script>
import {TweenMax} from 'gsap';
import Grab from '~/mixins/Grab.js';

export default {

  props: ['layout'],

  mixins: [Grab],

  data() {
    return {
      images: ''
    }
  },

  mounted() {
    this.images = this.$refs.images;
    this.runParallaxOnImages();
  },

  methods: {

    runParallaxOnImages() {
      requestAnimationFrame(this.runParallaxOnImages);

      let ratio = 0;
      for (let elm of this.images) {
        let sym = '';
        let distance = (Math.abs(this.currentPos) * parseFloat(elm.getAttribute('data-speed'))) - ratio;
        if (elm.getAttribute('data-direction') === 'left'){ sym = '-'; } else { sym = ''; }
        elm.style.transform = 'translate3d(' + sym + distance + 'px,0,0)';
        ratio += (window.innerWidth / 10);
      }
    },

  }

}

</script>

<style lang="scss">

.SliderParallax {
  min-height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: grab;
}

.SliderParallax__Track {
  height: 510px;
  white-space: nowrap;
}

.SliderParallax__Slide {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 850px;
  height: 100%;
  margin-left: 2%;
}


.SliderParallax__SlideImage {
  height: 100%;
  z-index: 10;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.SliderParallax__SlideInfos {
  position: relative;
  z-index: 10;
  max-width: 300px;
  margin-left: 50px;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  &:before {
    position: absolute;
    content: '';
    background: #FFF;
    width: 51px;
    height: 5px;
    top: 0;
    left: 0;
  }
}

.SliderParallax__SlideTitle {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 34px;
  max-width: 300px;
  white-space: normal;
}

.SliderParallax__SlideDesc {
  font-size: 1.8rem;
  color: #7B7B7B;
  white-space: normal;
  line-height: 2.6rem;
}

.SliderParallax__SlideBg {
  position: absolute;
  background: #191919;
  width: 100%;
  height: 290px;
  z-index: 0;
  top: calc(50% - 145px);
}


</style>
