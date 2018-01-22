<template>
  <div class="Canvas" ref="canvas">

  </div>
</template>

<script>
export default {

  props: ['projects'],

  data() {
    return {
      app: '',
      images: [],
      imagesUrl: [],
      bgContainer: '',
      maskContainer: '',
      projectContainer: '',
      noiseFilter: '',
      displacementSprite: '',
      displacementFilter: ''
    }
  },

  mounted() {
    this.initCanvas();
  },

  methods: {

    setup() {
      // this.initBackground();
      this.initProjectsImages();

      this.animate();
    },

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

      this.loadImages();
    },

    loadImages() {
      for (let key in this.projects) {
        if (!this.projects.hasOwnProperty(key)) continue;
        let project = this.projects[key];
        this.imagesUrl.push(project.images.main);
      }

      PIXI.loader
      .add(this.imagesUrl)
      .add("/images/sprite.png")
      .load(this.setup);
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

    initProjectsImages() {
      this.maskContainer = new PIXI.Container();
      this.projectContainer = new PIXI.Container();

      for (let i = 0; i < this.imagesUrl.length; i += 1) {
        this.images[i] = new PIXI.Sprite(PIXI.loader.resources[this.imagesUrl[i]].texture);
        this.images[i].scale.x = 0.5;
        this.images[i].scale.y = 0.5;
        this.images[i].anchor.set(0.5);
        this.images[i].position.x = window.innerWidth / 2;
        this.images[i].position.y = window.innerHeight / 2;
        this.images[i].interactive = true;

        this.projectContainer.addChild(this.images[i]);
      }

      this.displacementSprite = PIXI.Sprite.fromImage('http://i.imgur.com/2yYayZk.png');
      this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      this.displacementSprite.scale.x = 0.5;
      this.displacementSprite.scale.y = 0.5;
      this.projectContainer.addChild(this.displacementSprite);

      this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
      this.projectContainer.filters = [this.displacementFilter];
      this.displacementFilter.scale.x = 5;
      this.displacementFilter.scale.y = 5;

      // Init mask
      let maskX = (this.images[0].position.x - (this.images[0].width / 2));
      let maskY = (this.images[0].position.y - (this.images[0].height / 2));
      let padding = 25;

      let mask = new PIXI.Graphics();
      mask.beginFill(0x8bc5ff, 0.4);
      mask.moveTo(maskX + padding, maskY + padding);
      mask.lineTo(maskX + padding, maskY + padding);
      mask.lineTo((maskX + this.images[0].width) - padding, maskY + padding);
      mask.lineTo((maskX + this.images[0].width) - padding, (maskY + this.images[0].height) - padding);
      mask.lineTo(maskX + padding, (maskY + this.images[0].height) - padding);
      // mask.lineTo(0, 0);
      mask.endFill();

      this.maskContainer.mask = mask;
      this.maskContainer.addChild(mask);

      this.maskContainer.addChild(this.projectContainer);
      this.app.stage.addChild(this.maskContainer)
    },

    animate() {
      requestAnimationFrame(this.animate);

      // this.noiseFilter.seed = (Math.random() * 1) * 0.25;

      this.displacementSprite.x += 1;
      this.displacementSprite.y += 1;
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
