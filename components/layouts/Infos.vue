<template>
  <section class="Infos">
    <div class="Infos__Container">
      <div class="Infos__Left">
        <h3 class="Infos__Title"> {{ layout.title }} </h3>
        <p class="Infos__Subtitle"> {{ layout.subtitle }} </p>
      </div>
      <div class="Infos__Right">
        <p class="Infos__Paragraph" v-for="paragraph in layout.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>

export default {

  props: ['layout'],

}

</script>

<style lang="scss">

  .Infos {
    display: flex;
    align-items: center;
    min-height: 500px;
  }

  .Infos__Container {
    max-width: 1000px;
    width: 70%;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  .Infos__Left {
    max-width: 31%;
  }

  .Infos__Title {
    font-size: 4.4rem;
    font-weight: 600;
    line-height: 5.4rem;
  }

  .Infos__Subtitle {
    position: relative;
    color: #5E5E5E;
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 40px;

    &:after {
      position: absolute;
      content: '';
      width: 92px;
      height: 5px;
      background: rgba(255,255,255,.21);
      margin-left: 25px;
      top: 3px;
    }
  }

  .Infos__Right {
    max-width: 55%;
  }

  .Infos__Paragraph {
    font-size: 1.8rem;
    line-height: 2.7rem;
    margin-bottom: 36px;

    &:last-child() {
      margin-bottom: 0;
    }
  }

</style>
