<template>
  <div class="StripedTransition">
    <div class="slot-content">
      <slot name="content"/>
    </div>

    <div class="stripe stripe-left"
      :style="{ '--middle-r': middle.r, '--middle-g': middle.g, '--middle-b': middle.b }"/>

    <div class="stripe stripe-right"
      :style="{ '--end-r': end.r, '--end-g': end.g, '--end-b': end.b }"/>

    <div class="background"
      :style="{ '--start-r': start.r, '--start-g': start.g, '--start-b': start.b }"/>
  </div>
</template>

<script>
export default {
  name: 'StripedTransition',
  props: {
    start: {
      type: Object,
      default: () => ({
        r: 0,
        g: 0,
        b: 0,
      }),
    },
    middle: {
      type: Object,
      default: () => ({
        r: 0,
        g: 0,
        b: 0,
      }),
    },
    end: {
      type: Object,
      default: () => ({
        r: 0,
        g: 0,
        b: 0,
      }),
    },
  },
};
</script>

<style scoped>
.StripedTransition {
  display: block;
  position: relative;
  width: 100vw;
}

.slot-content {
  display: block;
}

.background {
  --start-r: 0;
  --start-g: 0;
  --start-b: 0;
  background-color: rgb(var(--start-r), var(--start-g), var(--start-b));
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -3;
}

.stripe {
  position: absolute;
  left: 0;
  bottom: 0;
}

.stripe-right {
  --end-r: 0;
  --end-g: 0;
  --end-b: 0;
  width: 100%;
  height: 30%;
  background-image: linear-gradient(to right bottom,
  rgba(0,0,0,0) 50%,
  rgb(var(--end-r), var(--end-g), var(--end-b)) 50%);
  z-index: -1;
}

.stripe-left {
  --middle-r: 0;
  --middle-g: 0;
  --middle-b: 0;
  width: 70%;
  height: 50%;
  background-image: linear-gradient(to left bottom,
  rgba(0,0,0,0) 50%,
  rgb(var(--middle-r), var(--middle-g), var(--middle-b)) 50%);
  z-index: -2;
}
</style>
