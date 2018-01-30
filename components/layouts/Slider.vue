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

export default {

  props: ['layout'],

  data() {
    return {
      container: '',
      track: '',
      isDragging: false,
      currentPos: 0,
    }
  },

  mounted() {
    this.container = this.$refs.container;
    this.track = this.$refs.track;
    this.initDrag();
    this.animate();
  },

  methods: {

    initDrag() {

      this.container.addEventListener('mousedown', () => {
        if (this.isDragging === false) {
          this.isDragging = true;
        }
      })

      window.addEventListener('mouseup', this.stopDrag)
      this.container.addEventListener('mouseup', this.stopDrag)
      this.track.addEventListener('mouseup', this.stopDrag)

      window.addEventListener('mousemove', (e) => {
        if (this.isDragging === true) {
          const nextPos = (e.movementX * 2);
          if ((this.currentPos + nextPos < 1) &&
          (Math.abs(this.currentPos + nextPos) < this.track.offsetWidth - (window.innerWidth / 3))) {
            this.currentPos += nextPos;
          }
        }
      })

    },

    stopDrag() {

      if (this.isDragging === true) {
        this.isDragging = false;
      }

    },

    animate() {
      requestAnimationFrame(this.animate);
      TweenMax.to(this.track, 0.5, {x:this.currentPos});
    }

  }

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
  /* transition: transform 0.3s ease; */
}

.Slider__Slide {
  display: inline-block;
  max-width: 750px;
  margin-left: 5%;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}


</style>
