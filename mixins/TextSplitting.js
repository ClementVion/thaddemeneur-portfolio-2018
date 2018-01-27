export default {

  data() {
    return {
      containers: ''
    }
  },

  mounted() {
    this.splitByLetters();
    setTimeout(() => {
      this.toggleLettersRandomly('fade-in');
    }, 1000);
  },

  methods: {

    splitByLetters() {
      this.containers = document.querySelectorAll('.js-toSplit');

      for (let i = 0; i < this.containers.length; i += 1) {
        const letters = this.containers[i].getAttribute('data-text').split('');
        this.containers[i].innerText = '';

        for (let j = 0; j < letters.length; j += 1) {

          if (letters[j] === ' ') {
            this.containers[i].innerHTML = `${this.containers[i].innerHTML}<span class="u-letter space">${letters[j]}</span>`;
          } else {
            this.containers[i].innerHTML = `${this.containers[i].innerHTML}<span class="u-letter">${letters[j]}</span>`;
          }
        }
      }
    },

    toggleLettersRandomly(classToUse) {
      this.containers = document.querySelectorAll('.js-toSplit');

      for (let i = 0; i < this.containers.length; i += 1) {
        const letters = [].slice.call(this.containers[i].querySelectorAll('.u-letter'));

        let max = letters.length;
        for (let j = 0; j < max; j += 1) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          const letter = letters[randomIndex];

          letter.style.transitionDelay = (j * 0.01) + 's';
          letter.classList.remove('fade-out', 'fade-in');
          letter.classList.add(classToUse);

          letters.splice(randomIndex, 1);
        }
      }
    }

  }

}
