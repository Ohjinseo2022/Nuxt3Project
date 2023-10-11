<script setup lang="ts">
export interface dataItem {
  [key: string]: any;
  id: string;
  userName: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
}

interface GridProps {
  dataItems: dataItem[];
  columns: any[];
  selected?: string;
  callBack?: () => {};
  scrollable?: string;
  noData?: string;
  modelValue?: boolean;
  detail?: () => {};
}
const props = withDefaults(defineProps<GridProps>(), {
  scrollable: "none",
  noData: "등록된 내역이 없습니다.",
});
const dataItem = ref<dataItem[]>([...props.dataItems]);
watch(props, () => {
  dataItem.value = [...props.dataItems];
  // modelVal.value = props.dataItem[0].radioSelectVal as string
});

const itemChange = async (e: any) => {
  const updatedData = dataItem.value.slice();
  const item = await update(updatedData, e.dataItem, false);
  item[e.field] = e.value;
  dataItem.value = updatedData;
};

///?
const update = async (data: dataItem[], item: any, remove: boolean) => {
  let updated;
  let itemID = item.index;
  let index = data.findIndex(
    (p) =>
      JSON.stringify({ ...p }) === JSON.stringify(item) ||
      (itemID && p.index === itemID)
  );
  if (index >= 0) {
    updated = Object.assign({}, item);
    data[index] = updated;
  } else {
    let id = 1;
    data.forEach((p) => {
      id = Math.max(p.index + 1, id);
    });
    updated = Object.assign({}, item, { index: id });
    data.unshift(updated);
    index = 0;
  }

  if (remove) {
    data = data.splice(index, 1);
  }
  return data[index];
};
const hasItemsInEdit = ref<boolean>(false);
watch(dataItem, () => {
  hasItemsInEdit.value =
    dataItem.value.filter((item) => item.inEdit).length > 0;
});

const cancelChanges = () => {
  //불필요한 코드같은느낌임
  let editedItems = dataItem.value.filter((item) => item.inEdit === true);
  if (editedItems.length) {
    editedItems.forEach((item) => {
      item.inEdit = undefined;
    });
  }
  dataItem.value = [...props.dataItems].slice();
};
const insert = async () => {
  const updateData = dataItem.value.slice();
  const newData = { inEdit: true };
  const item = await update(updateData, newData, false);
  const newDateItem = dataItem.value.slice();
  newDateItem.unshift(item);
  dataItem.value = newDateItem;
};
const edit = (e: any) => {
  e.dataItem.inEdit = true;
};
const save = (e: any) => {
  e.dataItem.inEdit = undefined;
  const data = dataItem.value.slice();
};
const cancel = (e: any) => {
  if (e.dataItem.ProductID) {
    e.dataItem.inEdit = undefined;
  } else {
    update(dataItem.value, e.dataItem, true);
  }
};
const remove = (e: any) => {
  e.dataItem.inEdit = undefined;
  update(dataItem.value, e.dataItem, true);
  update(props.dataItems, e.dataItem, true);
  dataItem.value = dataItem.value.slice();
};
</script>

<template>
  <!--       @selectionchange="onSelectionChange"
      @headerselectionchange="onHeaderSelectionChange" -->
  <div>
    <Grid
      :data-items="dataItem"
      :resizable="false"
      :reorderable="false"
      :sortable="false"
      :scrollable="scrollable"
      :selectable="false"
      :columns="columns"
      :selectedField="selected"
      :editField="'inEdit'"
      @itemchange="itemChange"
    >
      <GridNoRecords>
        <div>{{ noData }}</div>
      </GridNoRecords>
      <template v-slot:input="{ props }">
        <td>
          <!-- <CommonInput v-model="props.dataItem?.[props.field]" /> -->
          {{ props.dataItem?.[props.field] }}
        </td>
      </template>
      <template v-slot:command="{ props }">
        <CustomCommandCell
          :dataItem="props.dataItem"
          @edit="edit"
          @save="save"
          @remove="remove"
          @cancel="cancel"
        />
      </template>
      <GridToolbar>
        <Button title="Add new" :theme-color="'primary'" @click="insert">
          Add new
        </Button>
        <Button
          v-if="hasItemsInEdit"
          title="Cancel current changes"
          @click="cancelChanges"
        >
          Cancel current changes
        </Button>
      </GridToolbar>
    </Grid>
  </div>
</template>
<style scoped></style>
