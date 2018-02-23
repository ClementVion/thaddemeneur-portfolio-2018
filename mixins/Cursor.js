import {TweenMax} from 'gsap';

export default {

  data() {
    return {
      perimeter: 63,
      position: {}
    }
  },

  mounted() {
    this.initCursor();
    this.updatePosition();
    this.animate();
  },

  methods: {

    initCursor() {
      this.radius = this.perimeter / 2;
      this.$refs.cursor.style.width = this.perimeter + 'px';
      this.$refs.cursor.style.height = this.perimeter + 'px';
    },

    updatePosition() {
      window.addEventListener('mousemove', (e) => {
        this.position.x = e.clientX - this.radius + 'px';
        this.position.y = e.clientY - this.radius + 'px';
      })
    },

    animate() {
      requestAnimationFrame(this.animate);
      // this.$refs.cursor.style.left = this.position.x;
      // this.$refs.cursor.style.top = this.position.y;
      TweenMax.to(this.$refs.cursor.style, 0.2, {
        left: this.position.x,
        top: this.position.y,
        ease: Cubic.ease
      });
    },

  }

}
