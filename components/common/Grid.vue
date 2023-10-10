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
    </Grid>
  </div>
</template>
<style scoped></style>
