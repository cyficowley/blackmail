<template>
  <div class="Tagline">
    <div id="tagline-text">
      <h1 id="tagline-title">
        Incentivize Yourself to Complete Tasks
      </h1>

      <p id="tagline-description">
        Blackmail yourself into achieving goals you can't find the motivation to complete.
      </p>

      <v-row>
        <v-btn color="accent" class="font-weight-medium" id="action"
          @click="$vuetify.goTo('#Features', {duration:800})">
          Get Started
        </v-btn>
      </v-row>
    </div>

    <img src="../../assets/landingGirl.svg" id="tagline-art">

  </div>
</template>

<script>
export default {
  name: 'Tagline',
};
</script>

<style scoped>
.Tagline {
  display: flex;
  flex-wrap: warp;
  align-items: center;
  padding: 3rem 3rem 4rem 3rem;
  justify-content: center;
  height: calc(100vh - 64px);
}

#tagline-text {
  max-width: 550px;
  padding-bottom: 20%;
}

#tagline-title {
  text-align: left;
  font-size: 2.7rem;
  line-height: 3rem;
  font-weight: 400;
  margin-bottom: 12px;
}

#tagline-description {
  text-align: left;
  font-size: 1.5rem;
  color: var(--accent);
  font-weight: 400;
}

#tagline-art {
  --size: 40;
  width: calc(var(--size) * 1vw);
}

#action {
  margin: .5rem 0 0 .75rem;
}

/* Adjusting for Medium Screen Sizes */
@media only screen and (max-width: 1200px) {
  #tagline-text {
    max-width: 440px;
  }

  #tagline-title {
    font-size: 2rem;
    line-height: 2.5rem;
  }

  #tagline-description {
    text-align: left;
    font-size: 1.2rem;
    color: var(--accent);
    font-weight: 400;
  }

  #tagline-art {
    --size: 40;
  }
}

/* Adjusting for Small Screen Sizes */
@media only screen and (max-width: 840px) {
  .Tagline {
    display: block;
    padding: 3rem 3rem 1rem 3rem;
  }

  #tagline-text {
    max-width: 100%;
    padding-bottom: 0%;
  }

  #tagline-title {
    font-size: 1.75rem;
    line-height: 2.5rem;
  }

  #tagline-description {
    text-align: left;
    font-size: 1.2rem;
    color: var(--accent);
    font-weight: 400;
  }

  #tagline-art {
    --size: 75;
    transform: translateY(-2.5rem) translateX(1.5rem);
  }
}
</style>
