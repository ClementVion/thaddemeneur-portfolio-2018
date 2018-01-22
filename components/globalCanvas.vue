<template>
  <div class="Canvas" ref="canvas">

  </div>
</template>

<script>
export default {
  data() {
    return {
      app: '',
      bgContainer: '',
      noiseFilter: ''
    }
  },
  mounted() {
    this.initCanvas();
    // this.initBackground();

    // this.animate();
  },
  methods: {
    initCanvas() {
      var type = "WebGL"
      if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
      }
      PIXI.utils.sayHello(type)

      // Init app
      this.app = new PIXI.Application({
          antialias: true,
          transparent: false,
          backgroundColor: 0xF8F8F8,
          resolution: 2
        }
      );
      this.app.renderer.autoResize = true;
      this.app.renderer.view.style.position = "absolute";
      this.app.renderer.view.style.display = "block";
      this.app.renderer.autoResize = true;
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      this.$refs.canvas.appendChild(this.app.view);
    },
    initBackground() {
      this.bgContainer = new PIXI.Container();

      let bg = new PIXI.Graphics();
      bg.beginFill(0x0a0a0a, 1);
      bg.moveTo(0,0);
      bg.lineTo(0,0);
      bg.lineTo(this.app.view.width,0);
      bg.lineTo(this.app.view.width,this.app.view.height);
      bg.lineTo(0,this.app.view.height);
      bg.endFill();

      this.bgContainer.addChild(bg);

      this.noiseFilter = new PIXI.filters.NoiseFilter();
      this.noiseFilter.noise = 0.35;
      this.bgContainer.filters = [this.noiseFilter];

      this.app.stage.addChild(this.bgContainer);
    },
    animate() {
      requestAnimationFrame(this.animate);

      this.noiseFilter.seed = (Math.random() * 1) * 0.25;
    }
  }
}
</script>

<style lang="css">
  .Canvas {
    position: relative;
    z-index: 0;
  }
</style>
