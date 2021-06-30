<template>
  <div :class="$style.component">
    <h1
      class="limit-width"
      :class="$style.title">
      FREQUENTLY ASKED QUESTIONS
    </h1>

    <f-a-q />
  </div>
</template>


<script>
import FAQ from '@/components/about/FAQ.vue';

export default {
  name: 'About',
  components: {
    FAQ,
  },
};
</script>

<style module>
.component {
  padding-bottom: 52px;
}

.component h1.title {
  color: white;
  font-weight: 400;
  margin: 52px auto 0;
  font-size: 42px;
  text-align: center;
}

.component p {
  text-align: center;
  margin: 0 auto;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.616);
}
</style>
