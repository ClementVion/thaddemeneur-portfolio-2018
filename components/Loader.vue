<template>
  <div class="Loader">
    <div class="Loader__Container" ref="container">
      <div class="Loader__Progress">
        {{ progress }}
      </div>
      <div class="Loader__Infos">
        <h1 class="Loader__Name js-toSplit" data-text="Thaddé Méneur"></h1>
        <p class="Loader__Desc js-toSplit" data-text="French digital designer"></p>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '~/components/bus/EventBus.js'

export default {

  data() {
    return {
      progress: 0,
      nextStep: 0,
    }
  },

  mounted() {
    EventBus.$on('loadingProgress', ($event) => {
      this.nextStep = parseInt($event.progress);
      const loader = setInterval(() => {
        if (this.progress < this.nextStep) {
          this.progress += 1;
        }
        if (this.progress === 100) {
          EventBus.$emit('loadingEnded');
          setTimeout(() => {
            this.$refs.container.classList.add('fade-out');
          }, 300);
          clearInterval(loader);
        }
      }, 100);
    })
  }

}
</script>

<style lang="scss">
.Loader {
  width: 100vw;
  height: 100vh;
  background: #F5F5F5;
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Loader__Container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -11px;
}

.Loader__Progress {
  background: #FFF;
  width: 63px;
  height: 63px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.6rem;
  text-align: center;
  margin-right: 35px;
}

.Loader__Name {
  font-size: 2.1rem;
  font-weight: bold;
  margin-bottom: 6px;

  .letter {
    display: inline-block;

    &.space {
      width: 5px;
    }
  }
}

.Loader__Desc {
  font-size: 1.6rem;
  color: #7F7F7F;

  .letter {
    display: inline-block;

    &.space {
      width: 4px;
    }
  }
}

.Loader__Container.fade-out .Loader__Progress {
  opacity: 0;
  transition: ease 0.3s;
}

@for $i from 1 to 100 {
  .Loader__Name .letter:nth-child(#{$i}) {
    transition-delay: $i * 0.02s;
  }
  .Loader__Desc .letter:nth-child(#{$i}) {
    transition-delay: $i * 0.01s;
  }
}

.Loader__Container.fade-out .letter {
  transform: translateY(25%);
  opacity: 0;
  transition-duration: 0.2s;
  transition-timing-function: ease;
}

</style>
