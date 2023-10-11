<script setup lang="ts">
// import { dataItem } from "@/components/common/Grid.vue";
interface RowGridProps {
  dataItem: any;
  edit?: () => {};
  save?: () => {};
  remove?: () => {};
  cancel?: () => {};
}
const props = defineProps<RowGridProps>();
</script>
<template>
  <td v-if="!dataItem['inEdit']" class="k-command-cell">
    <!--  @click="editHandler" -->
    <Button
      :theme-color="'primary'"
      class="k-grid-edit-command"
     
    >
      Edit
    </Button>
    <!-- @click="removeHandler" -->
    <Button class="k-grid-remove-command" >
      Remove
    </Button>
  </td>
  <td v-else>
    <!-- @click="addUpdateHandler" -->
    <Button class="k-grid-save-command">
      {{ dataItem.index ? "Update" : "Add" }}
    </Button>

    <!-- @click="cancelDiscardHandler" -->
    <Button class="k-grid-cancel-command" >
      {{ dataItem.index ? "Cancel" : "Discard" }}
    </Button>
  </td>
</template>
<style scoped></style>
