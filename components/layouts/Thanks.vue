<template>
  <section class="Thanks">
    <div class="Thanks__Container">

      <div class="Thanks__Content">

        <h3 class="Thanks__Title"> {{ layout.title }} </h3>

        <ul class="Thanks__People">

          <li class="Thanks__Person" v-for="(person, index) in layout.people" :key="index">
            <span class="bold"> {{ person.name }}, </span>
            <span> {{ person.role }} </span>
          </li>

        </ul>

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

.Thanks {
  min-height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Thanks__Container {
  background: #191919;
  min-height: 310px;
  width: 90%;
  display: flex;
  align-items: center;
}

.Thanks__Content {
  margin-left: 15%;
}

.Thanks__Title {
  font-size: 4.4rem;
  font-weight: 600;
  margin-bottom: 30px;
}

.Thanks__People {}

.Thanks__Person {
  font-size: 1.8rem;
  color: #646464;
  line-height: 2.7rem;

  .bold {
    font-weight: 600;
    color: #FFF;
  }
}

</style>
