export default {

  data() {
    return {
      container: '',
      track: '',
      isDragging: false,
      currentPos: 0,
      nextPos: 0,
      lastPosMobile: 0,
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

      this.container.addEventListener('mousedown', this.startDrag)
      this.container.addEventListener('touchstart', this.startDrag)

      window.addEventListener('mouseup', this.stopDrag)
      window.addEventListener('touchend', this.stopDrag)
      this.container.addEventListener('mouseup', this.stopDrag)
      this.container.addEventListener('touchend', this.stopDrag)
      this.track.addEventListener('mouseup', this.stopDrag)
      this.track.addEventListener('touchend', this.stopDrag)

      window.addEventListener('mousemove', this.drag)
      window.addEventListener('touchmove', this.drag)

    },

    startDrag(e) {
      if (this.isDragging === false) {
        this.isDragging = true;
        this.lastPosMobile = e.touches[0].pageX;
      }
    },

    drag(e) {
      if (this.isDragging === true) {
        this.nextPos = (e.movementX * 2);
        if (!this.nextPos) {
          this.nextPos = -(this.lastPosMobile - e.touches[0].pageX);
          this.lastPosMobile = e.touches[0].pageX;
        }
        if ((this.currentPos + this.nextPos < 1)) {
          this.currentPos += this.nextPos;
        }
      }
    },

    stopDrag() {
      if (this.isDragging === true) {
        if ((Math.abs(this.currentPos) + this.nextPos) > (this.track.offsetWidth - ((window.innerWidth / 3) * 2))) {
          this.currentPos = -(this.track.offsetWidth - ((window.innerWidth / 3) * 2));
        }
        this.isDragging = false;
      }
    },

    animate() {
      requestAnimationFrame(this.animate);
      TweenMax.to(this.track, 0.5, {x:this.currentPos});
    }

  }

}
