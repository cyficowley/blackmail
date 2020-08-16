<template>
  <v-card
    width="95%"
    max-width="330px"
    raised>
    <v-list
      color="accent"
      disabled>
      <v-subheader dark>
        MY GOALS
      </v-subheader>

      <v-list-item-group
        v-model="task"
        color="primary">
        <v-list-item
          v-for="(item, i) in tasks"
          :key="i"
          color="white">
          <v-list-item-icon>
            <v-icon
              v-text="item.icon"
              color="white" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              v-text="item.text"
              :class="$style['list-item-text']" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'ChooseGoal',
  data: () => ({
    task: 1,
    tasks: [
      { text: 'Run three times a week', icon: 'mdi-run-fast' },
      { text: 'eat fewer cup noodles', icon: 'mdi-noodles' },
      { text: 'Go to bed by 11:00 PM', icon: 'mdi-sleep' },
      { text: 'Lose 10 lbs this month', icon: 'mdi-scale' },
    ],
  }),
};
</script>

<style module>
.list-item-text {
  color: white;
}
</style>
