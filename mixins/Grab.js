export default {

  data() {
    return {
      container: '',
      track: '',
      isDragging: false,
      currentPos: 0,
      nextPos: 0
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
          this.nextPos = (e.movementX * 2);
          if ((this.currentPos + this.nextPos < 1)) {
            this.currentPos += this.nextPos;
          }
        }
      })

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
