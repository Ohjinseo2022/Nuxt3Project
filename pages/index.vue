<script setup lang="ts">
import { dataItem } from '@/components/common/Grid.vue';


const columns = [{
  field: 'userName',title:'이름'},
  {field: 'col1',title:'A1',cell:'input'},
  {field: 'col2',title:'A2',cell:'input'},
  {field: 'col3',title:'A3',cell:'input'},
  {field: 'col4',title:'A4',cell:'input'},
  {field: 'col5',title:'A5',cell:'input'},
  {field: 'col6',title:'A6',cell:'input'},
  ]
const listData = ref<dataItem[]>([]);
const onList = async () => {
  const { data, error, count } = await useFetchApi("/user-master", {
    method: "get",
  });
  if(!error.value){
    const result = data.value as dataItem[];
    listData.value = result.map((item,idx)=>{
      return {
        id: item.id,
        userName : item.userName,
        col1: item.itemOneName,
        col2: item.itemOneSerialInfo,
        col3: item.itemTwoName,
        col4: item.itemTwoSerialInfo,
        col5: item.itemThreeName,
        col6: item.itemThreeSerialInfo,
      }
    })
  }

};
const inputValue = ref<string>("");
onMounted(async () => {
  await onList();
});
</script>
<template>
  <div>기본 설정 완료</div>
  <CommonInput v-model="inputValue" :placeholder="'공통컴포넌트 테스트 '" />
  <CommonGrid :dataItems="listData" :columns="columns"/>
</template>
