import Scrollbar from 'smooth-scrollbar';

export default {

  data() {
    return {
      scrollbar: ''
    }
  },

  mounted() {
    this.scrollbar = Scrollbar.init(document.querySelector('.ScrollContainer'), {
      damping: 0.15
    });
    this.runParallax();
  },

  methods: {

    runParallax() {
      requestAnimationFrame(this.runParallax);

      const parallaxElms = document.querySelectorAll('[data-parallax="true"]');
      for (let elm of parallaxElms) {
        let sym = '';
        let distance = Math.abs(this.scrollbar.scrollTop) * parseFloat(elm.getAttribute('data-speed'));
        if (elm.getAttribute('data-direction') === 'up'){ sym = '-'; } else { sym = ''; }
        elm.style.transform = 'translate3d(0, ' + sym + distance + 'px,0)';
      }
    },

  }

}