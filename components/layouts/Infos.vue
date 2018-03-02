<template>
  <section class="Infos">
    <div class="Infos__Container">
      <div class="Infos__Left">
        <h3 class="Infos__Title">
          <span
            v-for="(line, index) in layout.title"
            :key="index"
            class="Infos__TitleLine js-toSplit"
            :data-text="line">
          </span>
          <span class="Infos__TitleEmoji"> {{ layout.emoji }} </span>
        </h3>
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
    max-width: 38%;
  }

  .Infos__Title {
    font-size: 4.4rem;
    font-weight: 600;
    line-height: 5.4rem;

    .letter {
      display: inline-block;
      opacity: 0;
      transform: translateY(25px);
    }

    .letter.space {
      width: 11px;
    }
  }

  .Infos.appeared .Infos__Title .letter {
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  @for $i from 1 to 100 {
    .Infos__Title .letter:nth-child(#{$i}) {
      transition-delay: $i * 0.02s;
    }
  }

  .Infos__TitleLine {
    display: block;

    &:nth-child(2) {
      display: inline-block;
    }
  }

  .Infos__TitleEmoji {
    opacity: 0;
  }

  .Infos.appeared .Infos__TitleEmoji {
    transition: 0.3s 0.2s ease;
    opacity: 1;
  }

  .Infos__Subtitle {
    position: relative;
    color: #5E5E5E;
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 40px;
    opacity: 0;

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

  .Infos.appeared .Infos__Subtitle {
    transition: 0.3s 0.2s ease;
    opacity: 1;
  }

  .Infos__Right {
    max-width: 55%;
  }

  .Infos__Paragraph {
    font-size: 1.8rem;
    line-height: 2.7rem;
    margin-bottom: 36px;
    opacity: 0;
    transform: translateY(30px);

    &:last-child() {
      margin-bottom: 0;
    }
  }

  .Infos.appeared .Infos__Paragraph {
    transition: 0.6s ease;
    transform: translateY(0);
    opacity: 1;
  }

  @for $i from 1 to 100 {
    .Infos__Right .Infos__Paragraph:nth-child(#{$i}) {
      transition-delay: $i * 0.1s;
    }
  }


</style>
