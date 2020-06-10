<template>
  <div class="Features">
    <v-card class="step step-left" color="primary" elevation="0">
      <div class="step-text">
        <h1 class="step-title">
          Choose a Goal
        </h1>

        <p class="step-description">
          Determine a goal you need help finding motivation to complete.
          This can be related to anything: work, school, health, etc.
        </p>
        <p class="step-description">
          Your goal needs to be proveable upon completion.
        </p>
      </div>

      <v-card class="step-example" width="95%" max-width="330px" raised>
        <v-list disabled color="accent">
          <v-subheader dark>
            MY GOALS
          </v-subheader>

          <v-list-item-group v-model="task" color="primary">
            <v-list-item v-for="(item, i) in tasks" :key="i" color="white">
              <v-list-item-icon>
                <v-icon v-text="item.icon" color="white"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text" class="list-item-text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-card>

    <v-card class="step step-right" color="primary" elevation="0">
      <v-card
        class="step-example"
        width="95%"
        max-width="330px"
        raised
        color="accent"
        style="padding: 1rem 1rem 1rem .5rem;">
        <v-treeview
          v-model="tree"
          :open="open"
          :items="items"
          activatable
          dense
          item-key="name"
          open-on-click
          dark
          color="white">
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>
        </v-treeview>
      </v-card>

      <div class="step-text">
        <h1 class="step-title">
          Prepare your Blackmail
        </h1>

        <p class="step-description">
          Find an embarassing image, dark secret or confidential file.
        </p>

        <p class="step-description">
          Upload it to Blackmailer and provide the email address
          of the worst person it could be sent to.
        </p>
      </div>
    </v-card>

    <v-card class="step step-left" color="primary" elevation="0">
      <div class="step-text">
        <h1 class="step-title">
          Upload Proof before Deadline
        </h1>
        <p class="step-description">
          Submit proof of the completion of your goal for review, before your self set deadline.
          Or your blackmail will be sent.
        </p>
      </div>
      <v-card
        class="step-example"
        width="95%"
        max-width="330px"
        raised
        color="accent"
        style="padding: 1rem 1rem 1rem .5rem;margin-bottom: 1rem">
        <h1 v-if="!timerExpired" style="text-align:center;font-size:3rem; margin: 0;">
          {{timer}} <span style="font-size: 2rem">
            Seconds
          </span>
        </h1>

        <h3 v-if="!timerExpired" style="text-align:center">
          To Eat less Cup Noodles
        </h3>

        <h1 v-if="timerExpired" style="text-align:center;font-size:3rem; margin: 0;" class="pulse">
          TASK FAILED
        </h1>

        <h3 v-if="timerExpired" style="text-align:center">
          You just blackmailed yourself.
        </h3>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Features',
  data: () => ({
    timer: 30,
    timerInterval: null,
    timerExpired: false,
    task: 1,
    tasks: [
      { text: 'Run three times a week', icon: 'mdi-run-fast' },
      { text: 'Eat less Cup Noodles', icon: 'mdi-noodles' },
      { text: 'Go to bed by 11:00 PM', icon: 'mdi-sleep' },
      { text: 'Lose 10 lbs this month', icon: 'mdi-scale' },
    ],
    open: ['Documents', 'confidential_files'],
    files: {
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    },
    tree: [],
    items: [
      {
        name: 'Desktop',
      },
      {
        name: 'Applications',
      },
      {
        name: 'Documents',
        children: [
          {
            name: 'confidential_files',
            children: [
              {
                name: 'passwords.txt',
                file: 'txt',
              },
              {
                name: 'tax_evation_records.xls',
                file: 'xls',
              },
            ],
          },
          {
            name: 'all_my_nudes',
            children: [
              {
                name: 'yeet.png',
                file: 'png',
              },
              {
                name: 'from_top.png',
                file: 'png',
              },
              {
                name: 'expo_marker.png',
                file: 'png',
              },
            ],
          },
        ],
      },
    ],
  }),
  methods: {
    countdown() {
      if (this.$route.name !== 'Landing') {
        clearInterval(this.timerInterval);
      } else {
        this.timer -= 1;
        if (this.timer === 0) {
          this.timer = 30;
          clearInterval(this.timerInterval);
          this.timerExpired = true;
          this.timerInterval = setInterval(this.resetTimer, 5000);
        }
      }
    },
    resetTimer() {
      this.timerExpired = false;
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(this.countdown, 1000);
    },
  },
  created() {
    this.timerInterval = setInterval(this.countdown, 1000);
  },
};
</script>

<style scoped>
.Features {
  background-color: var(--dark);
  padding: 40px 0 3rem;
}

.step {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 4rem;
}

.step-right {
  flex-wrap: wrap-reverse;
}

.step-left {
  flex-wrap: wrap;
}

.step-text {
  max-width: 600px;
  padding: 12px;
  margin: 0 5% 2rem 5%;
}

.step-title {
  font-size: 2.2rem;
  color: var(--accent);
  text-align: left;
  margin: 0 0 1rem 0;
}

.step-description {
  color: rgba(255, 255, 255, 0.884);
  font-size: 1.25rem;
  line-height: 2rem;
  text-align: left;
  font-weight: lighter !important;
}

.list-item-text {
  color: white;
}

.pulse {
  opacity: .8;
  text-shadow: 2px 2px 5px rgba(255, 255, 255, 0);
  animation: pulse-text 1s ease infinite;
}

@keyframes pulse-text {
  50% {
    opacity: 1;
    text-shadow: 2px 2px 5px rgba(255, 195, 195, 0.699);
  }
  100% {
    opacity: .8;
    text-shadow: 2px 2px 5px rgba(255, 109, 109, 0);
  }
}

/* Adjusting for Medium Screen Sizes */
@media only screen and (max-width: 1200px) {
  .step {
    padding: 5rem 1rem;
  }

  .step-title {
    font-size: 2rem;
  }

  .step-description {
    font-size: 1.1rem;
    line-height: 1.7rem;
  }
}

/* Adjusting for Small Screen Sizes */
@media only screen and (max-width: 840px) {
  .step {
    display: flex;
    padding: 5rem 1rem;
  }

  .step-title {
    font-size: 1.6rem;
  }

  .step-description {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.v-treeview-node__label {
  transform: translateX(5px);
}
</style>
