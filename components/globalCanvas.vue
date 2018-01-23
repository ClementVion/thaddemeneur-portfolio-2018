<template>
  <div class="Canvas" ref="canvas">

  </div>
</template>

<script>
import {TweenMax} from 'gsap';

export default {

  props: ['projects'],

  data() {
    return {
      app: '',
      appW: 0,
      appH: 0,
      images: [],
      imagesUrl: [],
      bgContainer: '',
      maskContainer: '',
      projectsContainer: '',
      rectContainer: '',
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
      this.initRect();
      this.initProjectsImages();
      // this.goToProjectMode();
      this.animate();
      this.listenResize();
    },

    initCanvas() {
      var type = "WebGL"
      if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
      }
      PIXI.utils.sayHello(type)

      this.appW = window.innerWidth;
      this.appH = window.innerHeight;

      // Init app
      this.app = new PIXI.Application({
          antialias: true,
          transparent: false,
          backgroundColor: 0xF8F8F8,
          resolution: 2
        }
      );
      this.app.renderer.view.style.position = "absolute";
      this.app.renderer.view.style.display = "block";
      this.app.renderer.autoResize = true;
      this.app.renderer.resize(this.appW, this.appH);
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
      bg.lineTo(this.appW,0);
      bg.lineTo(this.appW,this.appH);
      bg.lineTo(0,this.appH);
      bg.endFill();

      this.bgContainer.addChild(bg);

      this.noiseFilter = new PIXI.filters.NoiseFilter();
      this.noiseFilter.noise = 0.35;
      this.bgContainer.filters = [this.noiseFilter];

      this.app.stage.addChild(this.bgContainer);
    },

    initProjectsImages() {
      this.maskContainer = new PIXI.Container();
      this.projectsContainer = new PIXI.Container();

      for (let i = 0; i < this.imagesUrl.length; i += 1) {
        this.images[i] = new PIXI.Sprite(PIXI.loader.resources[this.imagesUrl[i]].texture);
        this.images[i].anchor.set(0.5);
        this.images[i].interactive = true;
        this.projectsContainer.addChild(this.images[i]);
      }

      this.displacementSprite = PIXI.Sprite.fromImage('/images/sprite.png');
      this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      this.displacementSprite.scale.x = 0.5;
      this.displacementSprite.scale.y = 0.5;
      this.projectsContainer.addChild(this.displacementSprite);

      this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
      this.projectsContainer.filters = [this.displacementFilter];
      this.displacementFilter.scale.x = 5;
      this.displacementFilter.scale.y = 5;

      // Init mask for images
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
      mask.endFill();

      this.maskContainer.x = this.appW - (this.rectContainer.width / 2);
      this.maskContainer.y = this.appH / 2;
      this.maskContainer.scale.x = 0.5;
      this.maskContainer.scale.y = 0.5;

      this.maskContainer.mask = mask;
      this.maskContainer.addChild(mask);

      this.maskContainer.addChild(this.projectsContainer);
      this.app.stage.addChild(this.maskContainer)
    },

    initRect() {
      const rectWidth = (this.appW / 2.24);
      let rect = new PIXI.Graphics();

      rect.beginFill(0x000000, 1);
      rect.moveTo(0, 0);
      rect.lineTo(0, 0);
      rect.lineTo(rectWidth, 0);
      rect.lineTo(rectWidth, this.appH);
      rect.lineTo(0, this.appH);
      rect.endFill();

      this.rectContainer = new PIXI.Container();
      this.rectContainer.position.set(this.appW - (rectWidth / 2), (rect.height /2));
      this.rectContainer.pivot.set((rectWidth / 2), (rect.height /2));

      this.rectContainer.addChild(rect);
      this.app.stage.addChild(this.rectContainer);
    },

    goToProjectMode() {
      setTimeout(() => {
        TweenMax.to(this.rectContainer.skew, 0.5, {x: 0.3, ease: Power3.easeInOut});
        TweenMax.to(this.rectContainer.scale, 0.7, {x: 4, y: 2, ease: Power3.easeInOut});
        TweenMax.to(this.rectContainer.skew, 0.5, {x: 0, delay: 0.2, ease: Power3.easeInOut});

        TweenMax.to(this.maskContainer.skew, 0.7, {x: 0.2, ease: Power3.easeInOut});
        TweenMax.to(this.maskContainer, 1, {x: window.innerWidth / 2, ease: Power3.easeInOut});
        TweenMax.to(this.maskContainer.skew, 0.7, {x: 0, delay:0.3 , ease: Power3.easeInOut});
      }, 1000);
    },

    listenResize() {
      window.addEventListener('resize', () => {
        this.appW = window.innerWidth;
        this.appH = window.innerHeight;
        this.app.renderer.resize(this.appW, this.appH);
      });
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
