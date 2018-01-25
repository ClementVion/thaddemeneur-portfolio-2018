<template>
  <section class="ProjectInfos u-container">

    <div class="ProjectInfos__container">

      <p class="ProjectInfos__Number"> First Story </p>

      <h2 class="ProjectInfos__Title"> My internship at Ming Labs </h2>

      <p class="ProjectInfos__Desc"> and the way we helped craftsmen be more efficient at work </p>

      <div class="ProjectInfos__Button">
        <Button text="View case study" />
      </div>

    </div>

  </section>
</template>

<script>

import Button from '~/components/utils/Button';

export default {

  components: {
    Button,
  }

}

</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.ProjectInfos {
  display: flex;
  align-items: center;
}

.ProjectInfos__container {
  max-width: 633px;
  margin-top: -21px;
}

.ProjectInfos__Number {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 27px;
}

.ProjectInfos__Title {
  font-size: 4.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 6rem;
}

.ProjectInfos__Desc {
  font-size: 2.5rem;
  color: $grey;
  max-width: 542px;
  line-height: 3.5rem;
  margin-bottom: 74px;

  &:before {
    content: '-';
  }
}

</style>
