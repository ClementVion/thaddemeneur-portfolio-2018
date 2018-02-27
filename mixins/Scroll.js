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

      this.appearElms();
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

    appearElms() {
      const elms = this.$refs.infos;
      if (elms !== undefined) {
        for (let i = 0; i < elms.length; i += 1) {
          const elm = elms[i].$el;
          if (this.isElementInViewport(elm) && !elm.classList.contains('appeared')) {
            elm.classList.add('appeared');
          }
        }
      }
    },

    isElementInViewport(elm) {
      const rect = elm.getBoundingClientRect();

      return (
        rect.top <= ( (window.innerHeight / 2) || (document.documentElement.clientHeight / 2) ) &&
        rect.left >= 0 &&
        // rect.bottom <= ( (window.innerHeight) || (document.documentElement.clientHeight) ) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

  }

}
