<template>
  <section class="NextProject">
    <nuxt-link :to="'/projects/' + nextProject.slug" @click.native="clickOnNextProject">

      <!-- <div class="NextProject__ImageContainer">
        <img :src="imageUrl" alt="" class="NextProject__Image">
      </div>
      <div class="NextProject__Background" ref="mask"></div> -->

      <div class="NextProject__Canvas" ref="nextProjectCanvas"></div>

    </nuxt-link>
  </section>
</template>

<script>
import {TweenMax} from 'gsap';
import projects from '~/static/data/projects.json';
import EventBus from '~/components/bus/EventBus.js';

export default {

  props: ['currentProject'],

  data() {
    return {
      projectsArray: [],
      nextProject: '',
      imageUrl: '',
      color: '',
      backgroundContainer: '',
      background: '',
      imageContainer: '',
      image: '',
      widthToReach: 362,
      heightToReach: 552,
      mask: '',
      padding: 25,
      displacementSprite: '',
      displacementFilter: '',
      displacementSpeed: 1,
    }
  },

  mounted() {
    this.convertProjectsToArray();
    this.getNextProject();
    this.imageUrl = this.nextProject.images.main;
    this.initCanvas();
    this.listenResize();
    EventBus.$on('toggleNextProjectCanvas', ($event) => {
      this.toggleNextProjectCanvas($event.state);
    });
  },

  methods: {

    initCanvas() {
      var type = "WebGL"
      if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
      }
      PIXI.utils.sayHello(type)

      this.appW = window.innerWidth;
      this.appH = window.innerHeight - (window.innerHeight * 0.15);

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
      this.$refs.nextProjectCanvas.appendChild(this.app.view);

      this.setup();
    },

    setup() {
      this.initNextProjectBackground();
      this.initNextProjectImage();
      this.initMask();
      // this.animate();
    },

    initNextProjectBackground() {
      this.backgroundContainer = new PIXI.Container();

      this.background = new PIXI.Graphics();
      this.background.beginFill(this.nextProject.color, 1);
      this.background.moveTo(0,0);
      this.background.lineTo(0,0);
      this.background.lineTo(this.appW,0);
      this.background.lineTo(this.appW,this.appH);
      this.background.lineTo(0,this.appH);
      this.background.endFill();

      this.background.pivot.set(this.backgroundContainer.width / 2, this.backgroundContainer.height / 2);
      this.background.position.set(this.backgroundContainer.width / 2, this.backgroundContainer.height / 2);

      this.backgroundContainer.addChild(this.background);
      this.app.stage.addChild(this.backgroundContainer);
    },

    initNextProjectImage() {
      this.imageContainer = new PIXI.Container();

      this.image = new PIXI.Sprite(PIXI.loader.resources[this.imageUrl].texture);
      this.image.anchor.set(0.5);
      this.imageContainer.scale.x = 0.45;
      this.imageContainer.scale.y = 0.45;
      this.imageContainer.position.x = this.appW / 2;
      this.imageContainer.position.y = ((this.image.height * 0.45) / 2);
      this.imageContainer.addChild(this.image);

      this.$refs.nextProjectCanvas.addEventListener('mouseenter', () => {
        TweenMax.to(this.imageContainer.scale, 0.5, {x: 0.47, y: 0.47, ease: Cubic.easeOut});
      })

      this.$refs.nextProjectCanvas.addEventListener('mouseout', () => {
        TweenMax.to(this.imageContainer.scale, 0.5, {x: 0.45, y: 0.45, ease: Cubic.easeOut});
      })

      // this.displacementSprite = PIXI.Sprite.fromImage('/images/sprite.png');
      // this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      // this.displacementSprite.scale.x = 0.5;
      // this.displacementSprite.scale.y = 0.5;
      // this.imageContainer.addChild(this.displacementSprite);
      //
      // this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
      // this.imageContainer.filters = [this.displacementFilter];
      // this.displacementFilter.scale.x = 10;
      // this.displacementFilter.scale.y = 10;

      this.app.stage.addChild(this.imageContainer);
    },

    initMask() {
      const x1 = this.image.x - (this.image.width / 2);
      const x2 = x1 + this.image.width;
      const y1 = this.image.y - (this.image.height / 2);
      const y2 = y1 + this.image.height;

      this.mask = new PIXI.Graphics();
      this.mask.beginFill(0x8bc5ff, 0.4);
      this.mask.moveTo(x1  + this.padding, y1 + this.padding);
      this.mask.lineTo(x1 + this.padding, y1 + this.padding);
      this.mask.lineTo(x2 - this.padding, y1 + this.padding);
      this.mask.lineTo(x2 - this.padding, y2 - this.padding);
      this.mask.lineTo(x1 + this.padding, y2 - this.padding);
      this.mask.endFill();

      this.imageContainer.mask = this.mask;
      this.imageContainer.addChild(this.mask);
    },

    setCanvasToNextProject() {
      TweenMax.to(this.imageContainer.scale, 0.2, {x: 0.45, y: 0.45, ease: Cubic.easeOut});
      this.appH = window.innerHeight;
      TweenMax.to(this.imageContainer, 0.2, {y: this.appH / 2, ease: Cubic.ease});
      TweenMax.to(this.background, 0.5, {
        width: this.widthToReach,
        height: this.heightToReach,
        x: (this.appW / 2) - (this.widthToReach / 2),
        y: (this.appH / 2) - (this.heightToReach / 2),
        ease: Cubic.ease,
      });
    },

    toggleNextProjectCanvas(stateToUpdate) {
      if (stateToUpdate === 'start' && this.app.renderer.view.style.display === "none") {
        this.app.renderer.view.style.display = "block";
        this.app.start();
      } else if (stateToUpdate === 'stop' && this.app.renderer.view.style.display === "block"){
        this.app.renderer.view.style.display = "none";
        this.app.stop();
      }
    },

    convertProjectsToArray() {
      for (let key in projects) {
        if (!projects.hasOwnProperty(key)) continue;
        let project = projects[key];
        this.projectsArray.push(project);
      }
    },

    getNextProject() {
      if (this.currentProject.id + 1 >= this.projectsArray.length) {
        this.nextProject = this.projectsArray[0];
      } else {
        this.nextProject = this.projectsArray[this.currentProject.id + 1];
      }
    },

    clickOnNextProject() {
      this.setCanvasToNextProject();
      EventBus.$emit('clickOnNextProject');
      EventBus.$emit('changeProjectWithoutAnimation', {
        'currentProjectIndex': this.currentProject.id,
        'nextProjectIndex': this.nextProject.id,
      });
    },

    updateCanvas() {
      this.app.stage.removeChild(this.backgroundContainer);
      this.app.stage.removeChild(this.imageContainer);
      this.initNextProjectBackground();
      this.initNextProjectImage();
      this.initMask();
    },

    listenResize() {
      window.addEventListener('resize', () => {
        this.appW = window.innerWidth;
        this.appH = window.innerHeight;
        this.app.renderer.resize(this.appW, this.appH);
        this.updateCanvas();
      });
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.displacementSprite.x += this.displacementSpeed;
      this.displacementSprite.y += this.displacementSpeed;
    }

  }

}
</script>

<style lang="scss">

  .NextProject {
    position: relative;
    // height: 85vh;
    height: 552px;
    width: 100%;
    cursor: pointer;
    margin-top: 110px;
  }

  .NextProject__Canvas {
    // display: flex;
    // align-items: flex-end;
    margin-top: calc(100vh - 552px);
    height: 552px;
  }

  .page-leave-active .NextProject {
    height: 100vh;
  }

  .page-leave-active .NextProject__Canvas {
    margin-top: calc(100vh - 552px);
  }

</style>
