<template>
  <v-card
    color="accent"
    width="95%"
    max-width="330px"
    :class="$style.component"
    raised>
    <v-treeview
      v-model="tree"
      item-key="name"
      color="white"
      :open="open"
      :items="items"
      activatable
      dense
      open-on-click
      dark>
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
</template>

<script>
export default {
  name: 'PrepareBlackmail',
  data: () => ({
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
};
</script>

<style>
.v-treeview-node__label {
  transform: translateX(5px);
}
</style>

<style module>
.component {
  padding: 1rem 1rem 1rem .5rem;
}
</style>
