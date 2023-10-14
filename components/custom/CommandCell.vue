<script setup lang="ts">

interface RowGridProps {
  dataItem: dataItem;
  edit?: () => {};
  save?: () => {};
  remove?: () => {};
  cancel?: () => {};
}
const props = defineProps<RowGridProps>();
const emit = defineEmits(["edit", "save", "remove", "cancel"]);
const editHandler = () => {
  emit("edit", { dataItem: props.dataItem });
};
const removeHandler = () => {
  emit("remove", { dataItem: props.dataItem });
};
const addUpdateHandler = () => {
  emit("save", { dataItem: props.dataItem });
};
const cancelDiscardHandler = () => {
  emit("cancel", { dataItem: props.dataItem });
};

</script>
<template>
  <td v-if="!dataItem['inEdit']" class="k-command-cell">
    <Button class="k-grid-remove-command" @click="removeHandler">
      Remove
    </Button>
  </td>
  <td v-else>
    <Button class="k-grid-save-command" @click="addUpdateHandler">
      {{ dataItem.id ? "Update" : "Add" }}
    </Button>
    <Button class="k-grid-cancel-command" @click="cancelDiscardHandler">
      {{ dataItem.id ? "Cancel" : "Discard" }}
    </Button>
  </td>
</template>
<style scoped></style>
