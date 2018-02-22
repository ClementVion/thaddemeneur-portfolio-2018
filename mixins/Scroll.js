import Scrollbar from 'smooth-scrollbar';
import EventBus from '~/components/bus/EventBus.js'

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
    this.runScrollParallax();
    this.hideOnScroll();
  },

  methods: {

    runScrollParallax() {
      requestAnimationFrame(this.runScrollParallax);

      const parallaxElms = document.querySelectorAll('[data-parallax="true"]');
      for (let elm of parallaxElms) {
        let sym = '';
        let distance = Math.abs(this.scrollbar.scrollTop) * parseFloat(elm.getAttribute('data-speed'));
        if (elm.getAttribute('data-direction') === 'up'){ sym = '-'; } else { sym = ''; }
        elm.style.transform = 'translate3d(0, ' + sym + distance + 'px,0)';
      }

      this.toggleCanvas();
    },

    hideOnScroll() {
      requestAnimationFrame(this.hideOnScroll);

      const elmsToHide = document.querySelectorAll('.js-hideOnScroll');
      for (let elm of elmsToHide) {
        if (this.scrollbar.scrollTop > 100) {
          elm.classList.add('hidden');
        } else {
          elm.classList.remove('hidden');
        }
      }
    },

    toggleCanvas() {
      if (this.scrollbar.scrollTop > window.innerHeight) {
        EventBus.$emit('toggleMainCanvas', {'state' :'stop'});
      } else {
        EventBus.$emit('toggleMainCanvas', {'state' :'start'});
      }

      if (this.scrollbar.scrollTop < (this.scrollbar.limit.y - window.innerHeight)) {
        EventBus.$emit('toggleNextProjectCanvas', {'state' :'stop'});
      } else {
        EventBus.$emit('toggleNextProjectCanvas', {'state' :'start'});
      }
    },

  }

}
