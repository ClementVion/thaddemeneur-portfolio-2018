<template>
  <div class="Loader">
    <div class="Loader__Container" ref="container">
      <div class="Loader__Progress">
        {{ progress }}
      </div>
      <div class="Loader__Infos">
        <h1 class="Loader__Name"> Thaddé Méneur </h1>
        <p class="Loader__Desc"> French digital designer </p>
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

  &.fade-out {
    transition: 0.3s ease;
    opacity: 0;
  }
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
  font-size: 1.8rem;
  text-align: center;
  margin-right: 35px;
}

.Loader__Name {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 6px;
}

.Loader__Desc {
  font-size: 1.8rem;
  color: #7F7F7F;
}

</style>
