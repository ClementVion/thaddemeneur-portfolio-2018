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
    }
  },

  mounted() {
    this.convertProjectsToArray();
    this.getNextProject();
    this.imageUrl = this.nextProject.images.main;
    // this.color = this.nextProject.color.substring(2);
    // this.$refs.mask.style.backgroundColor = '#' + this.color;

    this.initCanvas();
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

      this.backgroundContainer.pivot.set(this.backgroundContainer.width / 2, this.backgroundContainer.height / 2);
      this.background.pivot.set(this.backgroundContainer.width / 2, this.backgroundContainer.height / 2);
      this.backgroundContainer.position.set(this.backgroundContainer.width / 2, this.backgroundContainer.height / 2);
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
      this.imageContainer.position.y = this.appH - ((this.image.height * 0.45) / 2);

      this.imageContainer.addChild(this.image);
      this.app.stage.addChild(this.imageContainer);
    },

    setCanvasToNextProject() {
      const widthToReach = 362;
      const heightToReach = 552;
      this.appH = window.innerHeight;
      TweenMax.to(this.imageContainer, 0.5, {y: this.appH / 2, ease: Cubic.easeInOut});
      TweenMax.to(this.background, 0.5, {
        width: widthToReach,
        height: heightToReach,
        x: (this.appW / 2) - (widthToReach / 2),
        y: (this.appH / 2) - (heightToReach / 2),
        ease: Cubic.easeInOut
      });
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
    }

  }

}
</script>

<style lang="scss">

  .NextProject {
    position: relative;
    // height: 85vh;
    height: 85vh;
    width: 100%;
    cursor: pointer;
    margin-top: 110px;
  }

  .NextProject__Canvas {
    // display: flex;
    // align-items: flex-end;
    margin-top: 15vh;
  }

  .page-leave-active .NextProject {
    height: 100vh;
  }

  .page-leave-active .NextProject__Canvas {
    margin-top: 0;
  }

  // .NextProject__ImageContainer {
  //   position: absolute;
  //   z-index: 10;
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: flex-end;
  // }
  //
  // .NextProject__Image {
  //   height: 552px;
  // }
  //
  // .page-leave-active .NextProject__Image {
  //   transition: 0.4s ease;
  //   transform: translateY(-200px);
  // }
  //
  // .NextProject__Background {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  // }
  //
  // .page-leave-active .NextProject__Background {
  //   transition: left 0.8s ease, all 0.4s ease;
  //   // transform: translateY(-9%) scaleX(0.25) scaleY(0.8);
  //   width: 362px;
  //   height: 552px;
  //   left: calc(50% - 181px);
  //   top: calc(50% - 276px);
  // }

</style>
