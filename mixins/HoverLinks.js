import EventBus from '~/components/bus/EventBus';

export default {

  data() {
    return {
      links: '',
    }
  },

  mounted() {
    this.links = document.querySelectorAll('.js-linkToHover');

    for (let i = 0; i < this.links.length; i += 1) {

      this.links[i].addEventListener('mouseenter', () => {
        EventBus.$emit('triggerLinkHover', {'state': 'hover'});
      })

      this.links[i].addEventListener('mouseout', () => {
        EventBus.$emit('triggerLinkHover', {'state': 'out'});
      })

    }
  }

}
