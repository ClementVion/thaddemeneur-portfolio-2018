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
      mask: ''
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

      // if (PIXI.utils.TextureCache[this.imageUrl] === undefined) {
      //   PIXI.loader
      //     .add(this.imageUrl)
      //     .load(this.setup);
      // } else {
        this.setup();
      // }
    },

    setup() {
      this.initNextProjectBackground();
      this.initNextProjectImage();
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
      this.app.stage.addChild(this.imageContainer);
    },

    setCanvasToNextProject() {
      this.appH = window.innerHeight;
      TweenMax.to(this.imageContainer, 0.2, {y: this.appH / 2, ease: Cubic.ease});
      TweenMax.to(this.background, 0.5, {
        width: this.widthToReach,
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
    },

    listenResize() {
      window.addEventListener('resize', () => {
        this.appW = window.innerWidth;
        this.appH = window.innerHeight;
        this.app.renderer.resize(this.appW, this.appH);
        this.updateCanvas();
      });
    },

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
