<template>
  <div class="Button">
    <div class="Button__Container">
      <p class="Button__Text"> {{ text }} </p>
    </div>
  </div>
</template>

<script>

export default {

  props: ['text']

}

</script>

<style lang="scss">

.Button {
  max-width: 250px;
  height: 50px;
  border: solid thin;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 20;
  position: relative;
}

.Button__Container {}

.Button__Text {
  font-size: 1.5rem;
  position: relative;
  font-weight: 600;
  width: calc(100% + 25px);
  margin-right: -12.5px;

  &:before {
    content: '';
    position: absolute;
    left: -25px;
    top: 7px;
    background: #000;
    width: 14px;
    height: 1px;
  }
}

</style>
