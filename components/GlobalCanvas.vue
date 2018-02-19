<template>

  <div class="Canvas" ref="canvas"></div>

</template>

<script>
import {TweenMax} from 'gsap';
import EventBus from '~/components/bus/EventBus.js'

export default {

  props: ['projects'],

  data() {
    return {
      projectsArray: [],
      app: '',
      appW: 0,
      appH: 0,
      currentProjectIndex: 0,
      images: [],
      imagesUrl: [],
      bgContainer: '',
      maskContainer: '',
      projectsContainer: '',
      rectContainer: '',
      rect: '',
      noiseFilterBg: '',
      noiseFilterRect: '',
      displacementSprite: '',
      displacementFilter: '',
      displacementSpeed: 1,
      maskBgHome: '',
      maskBgProject: '',
      padding: 25,
      maskX: 0,
      maskY: 0
    }
  },

  mounted() {
    this.convertProjectsToArray();
    this.initCanvas();
  },

  methods: {

    setup() {
      this.initBackground();
      this.initRect();
      this.initProjectsImages();

      this.listenResize();
      this.listenGlobalEvents();
      this.animate();
    },

    initCanvas() {
      var type = "WebGL"
      if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
      }
      PIXI.utils.sayHello(type)

      this.appW = window.innerWidth;
      this.appH = window.innerHeight;

      this.app = new PIXI.Application({
          antialias: true,
          transparent: true,
          resolution: 1
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
      bg.beginFill(0xF5F5F5, 1);
      bg.moveTo(0,0);
      bg.lineTo(0,0);
      bg.lineTo(this.appW,0);
      bg.lineTo(this.appW,this.appH);
      bg.lineTo(0,this.appH);
      bg.endFill();

      this.bgContainer.addChild(bg);

      this.noiseFilterBg = new PIXI.filters.NoiseFilter();
      this.noiseFilterBg.noise = 0.05;
      this.bgContainer.filters = [this.noiseFilterBg];

      this.app.stage.addChild(this.bgContainer);
    },

    initProjectsImages() {
      this.maskContainer = new PIXI.Container();
      this.projectsContainer = new PIXI.Container();

      for (let i = 0; i < this.imagesUrl.length; i += 1) {
        this.images[i] = new PIXI.Sprite(PIXI.loader.resources[this.imagesUrl[i]].texture);
        this.images[i].anchor.set(0.5);
      }

      this.projectsContainer.addChild(this.images[this.currentProjectIndex]);

      this.displacementSprite = PIXI.Sprite.fromImage('/images/sprite.png');
      this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      this.displacementSprite.scale.x = 0.5;
      this.displacementSprite.scale.y = 0.5;
      this.projectsContainer.addChild(this.displacementSprite);

      this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
      this.projectsContainer.filterArea = new PIXI.Rectangle(this.appW / 2, 0, this.appW / 2, this.appH);
      this.projectsContainer.filters = [this.displacementFilter];
      this.displacementFilter.scale.x = 10;
      this.displacementFilter.scale.y = 10;

      this.maskX = (this.images[0].position.x - (this.images[0].width / 2));
      this.maskY = (this.images[0].position.y - (this.images[0].height / 2));

      let mask = new PIXI.Graphics();
      mask.beginFill(0x8bc5ff, 0.4);
      mask.moveTo(this.maskX + this.padding, this.maskY + this.padding);
      mask.lineTo(this.maskX + this.padding, this.maskY + this.padding);
      mask.lineTo((this.maskX + this.images[0].width) - this.padding, this.maskY + this.padding);
      mask.lineTo((this.maskX + this.images[0].width) - this.padding, (this.maskY + this.images[0].height) - this.padding);
      mask.lineTo(this.maskX + this.padding, (this.maskY + this.images[0].height) - this.padding);
      mask.endFill();

      if (this.$route.name === 'index') {
        this.maskContainer.x = this.appW - (this.rectContainer.width / 2);
      } else if (this.$route.name === 'projects-slug') {
        this.maskContainer.x = window.innerWidth / 2;

        this.projectsContainer.removeChild(this.images[this.currentProjectIndex]);
        this.currentProjectIndex = this.$store.state.currentProjectIndex;
        this.projectsContainer.addChild(this.images[this.currentProjectIndex]);
      }

      this.maskContainer.y = this.appH / 2;
      this.maskContainer.scale.x = 0.45;
      this.maskContainer.scale.y = 0.45;
      this.maskContainer.interactive = true;
      this.maskContainer.buttonMode = true;
      this.maskContainer.defaultCursor = 'pointer';

      // Background
      this.maskBgHome = new PIXI.Graphics();
      this.maskBgHome.beginFill("0xF5F5F5", 1);
      this.maskBgHome.moveTo(this.maskX + this.padding, this.maskY + this.padding);
      this.maskBgHome.lineTo(this.maskX + this.padding, this.maskY + this.padding);
      this.maskBgHome.lineTo((this.maskX + this.images[0].width) - this.padding, this.maskY + this.padding);
      this.maskBgHome.lineTo((this.maskX + this.images[0].width) - this.padding, (this.maskY + this.images[0].height) - this.padding);
      this.maskBgHome.lineTo(this.maskX + this.padding, (this.maskY + this.images[0].height) - this.padding);
      this.maskBgHome.endFill();
      this.maskContainer.addChild(this.maskBgHome);

      this.updateProjectBgColor();

      // Events
      this.maskContainer.on('mouseover', () => {
        TweenMax.to(this, 0.5, {displacementSpeed: 5, ease: Cubic.ease});
      })

      this.maskContainer.on('mouseout', () => {
        TweenMax.to(this, 1.5, {displacementSpeed: 1, ease: Cubic.ease});
      })

      this.maskContainer.on('click', () => {
        EventBus.$emit('clickedOnImage');
      })

      this.maskContainer.mask = mask;
      this.maskContainer.addChild(mask);

      this.maskContainer.addChild(this.projectsContainer);
      this.app.stage.addChild(this.maskContainer)
    },

    initRect() {
      this.rect = new PIXI.Graphics();

      const rectWidth = (this.appW / 2.24);
      this.rect.beginFill(0x000000, 1);
      this.rect.moveTo(0, 0);
      this.rect.lineTo(0, 0);
      this.rect.lineTo(rectWidth, 0);
      this.rect.lineTo(rectWidth, this.appH);
      this.rect.lineTo(0, this.appH);
      this.rect.endFill();

      this.rectContainer = new PIXI.Container();
      this.rectContainer.position.set(this.appW - (rectWidth / 2), (this.rect.height /2));
      this.rectContainer.pivot.set((rectWidth / 2), (this.rect.height /2));

      if (this.$route.name === 'index') {
        this.rectContainer.scale.set(1, 1);
      } else if (this.$route.name === 'projects-slug') {
        this.rectContainer.scale.set(4, 2);
      }

      // this.noiseFilterRect = new PIXI.filters.NoiseFilter();
      // this.noiseFilterRect.noise = 0.2;
      // this.rect.filters = [this.noiseFilterRect];

      this.rectContainer.addChild(this.rect);
      this.app.stage.addChild(this.rectContainer);
    },

    switchToHome() {
      const newProjectBgX = this.maskBgProject.x - this.maskBgProject.x;
      TweenMax.to(this.maskBgProject.skew, 0.6, {x: 0.2, delay: 0.2, ease: Power3.easeInOut});
      TweenMax.to(this.maskBgProject, 0.6, {x: newProjectBgX, delay: 0.2, ease: Power3.easeInOut});
      TweenMax.to(this.maskBgProject.skew, 0.6, {x: 0, delay: 0.5, ease: Power3.easeInOut});
      setTimeout(() => {
        this.maskBgProject.scale.set(1);
      }, 1500);

      TweenMax.to(this.rectContainer.skew, 0.5, {x: 0.2, ease: Power3.easeInOut});
      TweenMax.to(this.rectContainer.scale, 0.9, {x: 1, y: 1, ease: Power3.easeInOut});
      TweenMax.to(this.rectContainer, 0.9, {x: (this.appW - (this.rect.width / 2)), ease: Power3.easeInOut});
      TweenMax.to(this.rectContainer.skew, 0.5, {x: 0, delay: 0.25, ease: Power3.easeInOut});

      TweenMax.to(this.maskContainer.skew, 0.7, {x: 0.2, ease: Power3.easeInOut});
      TweenMax.to(this.maskContainer, 0.9, {x: (this.appW - (this.rect.width / 2)), ease: Power3.easeInOut});
      TweenMax.to(this.maskContainer.skew, 0.7, {x: 0, delay:0.3 , ease: Power3.easeInOut});

      setTimeout(() => {
        this.projectsContainer.filterArea = new PIXI.Rectangle(this.appW / 2, 0, this.appW / 2, this.appH);
      }, 1000);
    },

    switchToProject() {
      const newProjectBgX = this.maskBgProject.x + this.images[0].width + 350;
      this.maskBgProject.scale.set(1.5);
      TweenMax.to(this.maskBgProject.skew, 0.6, {x: 0.2, delay: 0.2, ease: Power3.easeInOut});
      TweenMax.to(this.maskBgProject, 0.6, {x: newProjectBgX, delay: 0.2,ease: Power3.easeInOut});
      TweenMax.to(this.maskBgProject.skew, 0.6, {x: 0, delay: 0.5, ease: Power3.easeInOut});

      this.projectsContainer.removeChild(this.images[this.currentProjectIndex]);
      this.currentProjectIndex = this.$store.state.currentProjectIndex;
      this.projectsContainer.addChild(this.images[this.currentProjectIndex]);

      this.projectsContainer.filterArea = new PIXI.Rectangle(0, 0, this.appW, this.appH);
      TweenMax.to(this.rectContainer.skew, 0.5, {x: 0.3, ease: Power3.easeInOut});
      TweenMax.to(this.rectContainer.scale, 0.7, {x: 4, y: 2, ease: Power3.easeInOut});
      TweenMax.to(this.rectContainer.skew, 0.5, {x: 0, delay: 0.2, ease: Power3.easeInOut});

      TweenMax.to(this.maskContainer.skew, 0.7, {x: 0.2, ease: Power3.easeInOut});
      TweenMax.to(this.maskContainer, 1, {x: this.appW / 2, ease: Power3.easeInOut});
      TweenMax.to(this.maskContainer.skew, 0.7, {x: 0, delay:0.3 , ease: Power3.easeInOut});
    },

    switchToAbout() {
      const newRectX = this.appW * 1.3;
      TweenMax.to(this.rectContainer.skew, 0.8, {x: 0.3, ease: Power3.easeInOut});
      TweenMax.to(this.rectContainer.scale, 1, {x: 1.2, y: 1.2, ease: Power3.easeInOut});
      TweenMax.to(this.rectContainer, 1.2, {x: newRectX, ease: Power3.easeInOut});
      TweenMax.to(this.rectContainer.skew, 0.8, {x: 0, delay: 0.3, ease: Power3.easeInOut});

      TweenMax.to(this.maskContainer.skew, 0.8, {x: 0.2, ease: Power3.easeInOut});
      TweenMax.to(this.maskContainer, 1.2, {x: newRectX, ease: Power3.easeInOut});
      TweenMax.to(this.maskContainer.skew, 0.8, {x: 0, delay:0.3 , ease: Power3.easeInOut});
    },

    changeImage(currentImageIndex, nextImageIndex) {
      this.currentProjectIndex = nextImageIndex;
      this.images[currentImageIndex].alpha = 1;
      this.images[nextImageIndex].alpha = 0;
      this.projectsContainer.removeChild(this.images[currentImageIndex], this.images[nextImageIndex]);
      this.projectsContainer.addChild(this.images[nextImageIndex], this.images[currentImageIndex]);

      TweenMax.to(this, 1.5, {displacementSpeed: 10, ease: Cubic.easeInOut});
      TweenMax.to(this.displacementFilter.scale, 1, {x: 30,y: 30, ease: Cubic.easeInOut});

      TweenMax.to(this.projectsContainer.scale, 1, {x: 1.05,y: 1.05, ease: Cubic.easeInOut});

      TweenMax.to(this.images[currentImageIndex], 2, {alpha: 0, delay: 0.5, ease: Cubic.easeInOut});
      TweenMax.to(this.images[nextImageIndex], 2, {alpha: 1, delay: 0.5, ease: Cubic.easeInOut});

      TweenMax.to(this.projectsContainer.scale, 1.5, {x: 1,y: 1, delay: 1.25, ease: Cubic.easeInOut});

      TweenMax.to(this.displacementFilter.scale, 3, {x: 5,y: 5, delay: 1, ease: Cubic.easeInOut});
      TweenMax.to(this, 3, {displacementSpeed: 1, delay: 1, ease: Cubic.easeInOut});

      this.maskContainer.removeChild(this.maskBgProject);

      this.updateProjectBgColor();

      this.maskContainer.removeChild(this.projectsContainer);
      this.maskContainer.addChild(this.projectsContainer);
    },

    updateProjectBgColor() {
      const color = this.projectsArray[this.currentProjectIndex].color;
      const bgProjectX = this.maskX - this.images[0].width;
      this.maskBgProject = new PIXI.Graphics();
      this.maskBgProject.beginFill(color, 1);
      this.maskBgProject.moveTo(bgProjectX + this.padding, this.maskY + this.padding);
      this.maskBgProject.lineTo(bgProjectX + this.padding, this.maskY + this.padding);
      this.maskBgProject.lineTo((bgProjectX + this.images[0].width) - this.padding, this.maskY + this.padding);
      this.maskBgProject.lineTo((bgProjectX + this.images[0].width) - this.padding, (this.maskY + this.images[0].height) - this.padding);
      this.maskBgProject.lineTo(bgProjectX + this.padding, (this.maskY + this.images[0].height) - this.padding);
      this.maskBgProject.endFill();
      this.maskContainer.addChild(this.maskBgProject);

      if (this.$route.name === 'projects-slug') {
        const newProjectBgX = this.maskBgProject.x + this.images[0].width + 350;
        this.maskBgProject.scale.set(1.5);
        this.maskBgProject.x = newProjectBgX;
        this.projectsContainer.filterArea = new PIXI.Rectangle(0, 0, this.appW, this.appH);
      }
    },

    listenResize() {
      window.addEventListener('resize', () => {
        this.appW = window.innerWidth;
        this.appH = window.innerHeight;
        this.app.renderer.resize(this.appW, this.appH);
        this.app.stage.removeChild(this.bgContainer);
        this.app.stage.removeChild(this.rectContainer);
        this.app.stage.removeChild(this.maskContainer);
        this.initBackground();
        this.initRect();
        this.initProjectsImages();
      });
    },

    listenGlobalEvents() {
      EventBus.$on('switchToHome', ($event) => {
        this.switchToHome();
      })

      EventBus.$on('switchToProject', ($event) => {
        this.switchToProject();
      })

      EventBus.$on('switchToAbout', ($event) => {
        this.switchToAbout();
      })

      EventBus.$on('changeProject', ($event) => {
        this.changeImage($event.currentProjectIndex, $event.nextProjectIndex);
      })
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.noiseFilterBg.seed = (Math.random() * 1) * 0.05;
      // this.noiseFilterRect.seed = (Math.random() * 1) * 0.05;
      this.displacementSprite.x += this.displacementSpeed;
      this.displacementSprite.y += this.displacementSpeed;
    },

    convertProjectsToArray() {
      for (let key in this.projects) {
        if (!this.projects.hasOwnProperty(key)) continue;
        let project = this.projects[key];
        this.projectsArray.push(project);
      }
    },

  }
}
</script>

<style lang="scss">
  .Canvas {
    position: relative;
    top: 0;
    z-index: 0;
  }
</style>
