<template>
  <div :class="$style.component">
    <create-deadline
      :open="createModal"
      @close="closeCreate"/>

    <v-card
      class="limit-width"
      :class="$style.deadlines">
      <v-expansion-panels
        v-model="filterPanel"
        accordion
        readonly>
        <v-expansion-panel>
          <v-expansion-panel-header
            color="accent"
            disable-icon-rotate>
            <h2 :class="$style['list-title']">
              MY DEADLINES
            </h2>

            <template v-slot:actions>
              <v-btn
                dark
                text
                @click="filterPanelToggle">
                Filter
                <v-icon
                  color="white"
                  :class="$style['filter-icon']"
                  right>
                  mdi-tune
                </v-icon>
              </v-btn>

              <v-btn
                text
                dark
                @click="openCreate">
                Create
                <v-icon
                  color="white"
                  :class="$style['create-icon']"
                  right>
                  mdi-plus-circle-outline
                </v-icon>
              </v-btn>
            </template>
          </v-expansion-panel-header>

          <v-expansion-panel-content color="white">
            <div :class="$style['filter-wrapper']">
              <v-list
                :class="$style.list"
                dense
                light>
                <v-subheader>
                  Filter
                </v-subheader>

                <v-list-item-group v-model="filter">
                  <v-list-item
                    v-for="choice in filterDeadlines"
                    :key="`filter-choice-${choice.text}`">
                    <v-list-item-icon>
                      <v-icon v-text="choice.icon" />
                    </v-list-item-icon>

                    <v-list-item-content>
                      {{ choice.text }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-list
                dense
                light>
                <v-subheader>
                  Sort
                </v-subheader>

                <v-list-item-group v-model="sort">
                  <v-list-item
                    v-for="choice in sortDeadlines"
                    :key="`sort-choice-${choice.text}`">
                    <v-list-item-icon>
                      <v-icon v-text="choice.icon" />
                    </v-list-item-icon>

                    <v-list-item-content>
                      {{ choice.text }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card-text :class="$style.list">
        <v-expansion-panels accordion>
          <deadline
            v-for="(deadline, i) in sortedFilteredDeadlines"
            :key="i"
            :class="$style.deadline"
            :deadline="deadline"/>
        </v-expansion-panels>

        <div v-if="deadlines.length === 0">
          <h2>
            You have not created a deadline.
          </h2>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
import CreateDeadline from '@/components/modal/CreateDeadline.vue';
import Deadline from '../../components/home/Deadline.vue';

export default {
  name: 'Home',
  components: {
    Deadline,
    CreateDeadline,
  },
  data: () => ({
    filter: 0,
    filterDeadlines: [
      { text: 'All', icon: 'mdi-check-box-multiple-outline' },
      { text: 'Incomplete', icon: 'mdi-checkbox-blank-outline' },
      { text: 'Completed', icon: 'mdi-check-box-outline' },
    ],
    sort: 0,
    sortDeadlines: [
      { text: 'Deadline', icon: 'mdi-clock-outline' },
      { text: 'Alphabetical', icon: 'mdi-sort-alphabetical-descending-variant' },
    ],
    createModal: false,
    filterPanel: [],
  }),
  methods: {
    filterPanelToggle() {
      if (this.filterPanel instanceof Array && this.filterPanel.length === 0) {
        this.filterPanel = 0;
      } else {
        this.filterPanel = [];
      }
    },
    openCreate() {
      this.createModal = true;
    },
    closeCreate() {
      this.createModal = false;
    },
    getUrlVal(field, url) {
      const href = url || window.location.href;
      const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
      const string = reg.exec(href);
      return string ? string[1] : null;
    },
  },
  computed: {
    deadlines() {
      return this.$store.state.deadlines;
    },
    filteredDeadlines() {
      switch (this.filter) {
        case 1: {
          return this.$store.state.deadlines.filter((deadline) => deadline.status !== 'Blackmailed' && deadline.status !== 'Approved');
        }
        case 2: {
          return this.$store.state.deadlines.filter((deadline) => deadline.status === 'Blackmailed' || deadline.status === 'Approved');
        }
        default: {
          return this.$store.state.deadlines;
        }
      }
    },
    sortedFilteredDeadlines() {
      switch (this.sort) {
        case 1: {
          return this.filteredDeadlines.slice().sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
        }
        default: {
          return this.filteredDeadlines.slice().sort((a, b) => {
            if (a.dueStamp.getTime() < b.dueStamp.getTime()) {
              return -1;
            }
            if (a.dueStamp.getTime() > b.dueStamp.getTime()) {
              return 1;
            }
            return 0;
          });
        }
      }
    },
  },
  async created() {
    if (this.deadlines.length === 0) {
      await this.$store.dispatch('getAllDeadlines');
    }
  },
};
</script>

<style>
button.v-expansion-panel-header {
  cursor: default;
}
</style>

<style module>
.component {
  font-size: 70px;
  text-align: center;
  line-height: 100px;
}

.deadlines {
  margin: 1rem auto;
  vertical-align: top;
  width: 90%;
}

.deadlines .list {
  padding: 0
}

.list-title {
  font-weight: normal;
}

.filter-wrapper {
  display: flex;
}

.filter-wrapper .list {
  margin-right: 1rem;
}

.filter-icon {
  margin-left: .5rem;
}

.create-icon {
  margin-left: .5rem;
}
</style>
