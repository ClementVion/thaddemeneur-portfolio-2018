export default {

  data() {
    return {
      containers: ''
    }
  },

  mounted() {
    this.splitByLetters();
  },

  methods: {

    splitByLetters() {
      this.containers = document.querySelectorAll('.js-toSplit');

      for (let i = 0; i < this.containers.length; i += 1) {
        const letters = this.containers[i].getAttribute('data-text').split('');
        this.containers[i].innerText = '';

        for (let j = 0; j < letters.length; j += 1) {

          if (letters[j] === ' ') {
            this.containers[i].innerHTML = `${this.containers[i].innerHTML}<span class="letter space">${letters[j]}</span>`;
          } else {
            this.containers[i].innerHTML = `${this.containers[i].innerHTML}<span class="letter">${letters[j]}</span>`;
          }
        }
      }
    },

  }

}
