<template>
  <section class="NextProject">
    <nuxt-link :to="'/projects/' + nextProject.slug" @click.native="clickOnNextProject">

      <!-- <div class="NextProject__ImageContainer">
        <img :src="imageUrl" alt="" class="NextProject__Image">
      </div>
      <div class="NextProject__Background" ref="mask"></div> -->

      <svg class="NextProject__TextCusor" ref="cursorText" width="111" height="109" xmlns="http://www.w3.org/2000/svg"><path d="M34.055 105.365l-2.55-.6 3.099-13.14 1.933.455 4.698 10.292 2.052-8.7 2.549.6-3.098 13.14-1.917-.451-4.72-10.27-2.046 8.674zM11.938 83.202l3.794 4.057 2.368-2.215-3.277-3.505 1.707-1.597 3.278 3.506 2.369-2.216-3.794-4.057 1.708-1.597 5.582 5.97-9.86 9.221-5.583-5.97 1.708-1.597zm1.954-30.033l.772 2.932-3.842 4.156 5.387 1.718.771 2.932-7.88-2.734-5.236 5.94-.769-2.924 3.537-3.83-4.968-1.61-.767-2.915 7.474 2.604 5.521-6.269zM7.16 29.902l2.27.664-.975 3.332 10.688 3.125-.733 2.506-10.688-3.126-.977 3.341-2.269-.664 2.684-9.178zM39.397 2.418c1.998-.996 4.355-.169 5.34 1.805.997 1.998.189 4.277-1.809 5.273l-3.248 1.62 2.495 5.003-2.344 1.169-6.026-12.08 5.592-2.79zm2.188 5.273c.928-.463 1.35-1.39.89-2.31-.446-.897-1.46-1.157-2.388-.694L37.192 6.13l1.5 3.005 2.893-1.444zm27.24 6.761L66.43 8.68l-2.227-.157-.393 5.576-2.613-.185.95-13.466 6.233.44c2.227.157 3.837 2.068 3.682 4.268-.126 1.789-1.35 3.139-2.972 3.526l2.575 5.97-2.84-.2zm-4.23-11.488l-.236 3.35 3.226.227c1.035.073 1.869-.511 1.941-1.537.07-1-.67-1.74-1.705-1.812l-3.226-.228zm21.56 22.472a6.917 6.917 0 0 1-1.75-9.637 6.917 6.917 0 0 1 9.636-1.75 6.924 6.924 0 0 1 1.757 9.643 6.924 6.924 0 0 1-9.644 1.744zm1.44-2.08c2.038 1.41 4.704.927 6.115-1.11 1.412-2.038.927-4.704-1.11-6.115-2.03-1.407-4.704-.928-6.115 1.11-1.411 2.037-.92 4.708 1.11 6.115zm8.346 19.51c-.5-1.257-.614-2.423-.412-3.412l2.445.248c-.16.669-.127 1.536.14 2.205.522 1.315 1.735 1.58 3.196.998l8.085-3.216.968 2.433-8.534 3.396c-2.4.955-4.816.043-5.888-2.652zm11.893 26.064l.476-5.535-3.231-.278-.411 4.781-2.33-.2.412-4.781-3.232-.278-.476 5.534-2.329-.2.7-8.144 13.45 1.157-.7 8.144-2.329-.2zM87.038 83.052a6.913 6.913 0 0 1 9.57-2.115 6.913 6.913 0 0 1 2.102 9.573c-1.102 1.726-2.975 2.876-4.906 3.123l-.27-2.498c1.248-.141 2.382-.856 3.088-1.96 1.334-2.088.759-4.73-1.382-6.097-2.14-1.368-4.779-.78-6.113 1.308-.706 1.104-.877 2.434-.481 3.625l-2.381.805c-.587-1.856-.33-4.039.773-5.764zm-15.703 25.084l-1.022-2.132 3.13-1.501-4.814-10.041 2.353-1.129 4.815 10.041 3.139-1.505 1.022 2.132-8.623 4.135z" fill="#FFF" fill-rule="evenodd"/></svg>


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
      cursorContainer: '',
      cursorElm: {},
      cursorPos: {},
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
      this.animate();
      this.initCursor();
      this.listenMouseEvents();
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

    listenMouseEvents() {
      this.$refs.nextProjectCanvas.addEventListener('mouseenter', () => {
        TweenMax.to(this.imageContainer.scale, 0.5, {x: 0.47, y: 0.47, ease: Cubic.ease});
        TweenMax.to(this.$refs.cursorText, 0.5, {opacity: 1, ease: Cubic.ease});
        TweenMax.to(this.cursorElm, 0.5, {alpha: 0.3, ease: Cubic.ease});
      })

      this.$refs.nextProjectCanvas.addEventListener('mouseout', () => {
        TweenMax.to(this.imageContainer.scale, 0.5, {x: 0.45, y: 0.45, ease: Cubic.ease});
        TweenMax.to(this.$refs.cursorText, 0.5, {opacity: 0, ease: Cubic.ease});
        TweenMax.to(this.cursorElm, 0.5, {alpha: 0, ease: Cubic.ease});
      })
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

    initCursor() {
      this.cursorContainer = new PIXI.Container();
      this.cursorElm = new PIXI.Graphics();

      this.cursorElm.beginFill(0x000, 0.4);
      this.cursorElm.drawCircle(0, 0, 16);
      this.cursorElm.endFill();
      this.cursorElm.x = this.appW / 2;
      this.cursorElm.y = this.appH / 2;
      this.cursorElm.alpha = 0;

      this.cursorContainer.addChild(this.cursorElm);
      this.app.stage.addChild(this.cursorContainer);

      this.cursorPos = {x: this.appW / 2, y: this.appH / 2};

      const canvas = this.$refs.nextProjectCanvas.querySelector('canvas');

      canvas.addEventListener('mousemove', (e) => {
        if (this.cursorElm.alpha !== 1) {
          TweenMax.to(this.cursorElm, 0.5, {alpha: 0.3, ease: Cubic.ease});
          TweenMax.to(this.$refs.cursorText, 0.5, {opacity: 1, ease: Cubic.ease});
        }

        const diff = canvas.getBoundingClientRect().top;

        this.cursorPos.x = e.clientX + 2;
        this.cursorPos.y = e.clientY - diff + 5;
      });
      window.addEventListener('wheel', () => {
        if (this.cursorElm.alpha !== 0) {
          TweenMax.to(this.cursorElm, 0.5, {alpha: 0, ease: Cubic.ease});
          if (this.$refs.cursorText) {
            TweenMax.to(this.$refs.cursorText, 0.5, {opacity: 0, ease: Cubic.ease});
          }
        }
      })

    },

    updateCanvas() {
      this.app.stage.removeChild(this.backgroundContainer);
      this.app.stage.removeChild(this.imageContainer);
      this.initNextProjectBackground();
      this.initNextProjectImage();
      this.initMask();
      this.initCursor();
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
      // this.displacementSprite.x += this.displacementSpeed;
      // this.displacementSprite.y += this.displacementSpeed;

      TweenMax.to(this.cursorElm, 0.3, {
        x: this.cursorPos.x,
        y: this.cursorPos.y,
        ease: Cubic.ease
      });

      if (this.$refs.cursorText) {
        TweenMax.to(this.$refs.cursorText, 0.3, {
          left: this.cursorPos.x - 56,
          top: this.cursorPos.y - 56,
          ease: Cubic.ease
        });
      }
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

  .NextProject__TextCusor {
    position: absolute;
    top: 0;
    z-index: 50;
    pointer-events: none;
    opacity: 0;
    transform-origin: 50% 50%;
    animation: rotate 5s linear infinite;
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

  @keyframes rotate {
    0% {
      transform: rotate(0) scale(0.7);
    }
    100% {
      transform: rotate(360deg) scale(0.7);
    }
  }

</style>
