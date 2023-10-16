<script setup lang="ts">

const columns = [{
  field: 'userName',title:'이름'},
  {field: 'col1',title:'A1'},
  {field: 'col2',title:'A2'},
  {field: 'col3',title:'A3'},
  {field: 'col4',title:'A4'},
  {field: 'col5',title:'A5'},
  {field: 'col6',title:'A6'},
  {field: 'col7',title:'A7',cell:'command'},
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
        index:idx,
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
const onDataHanddler = async (dataitems:dataItem[],addItem:dataItem,trigger:string)=>{
  if(trigger ==='save'){
    listData.value = dataitems
    await onInsert(addItem)
  }
} 
const onDelete = (id:string)=>{
  //삭제 기능 구현하기용! 
}
const onUpdate = (id:string)=>{
//id가 있다면 업데이트
}
const onInsert = async (dataItem:dataItem)=>{
//id가 없다면 추가
const reqBody={
  id: generateRandomString(10),
  userName:dataItem.userName,
  itemOneName:dataItem.col1,
  itemOneSerialInfo:dataItem.col2,
  itemTwoName:dataItem.col3,
  itemTwoSerialInfo:dataItem.col4,
  itemThreeName:dataItem.col5,
  itemThreeSerialInfo:dataItem.col6,
}
console.log(reqBody)
  const {data , error } = await useFetchApi('/user-master/create',{
    method:'POST',
    body: reqBody
  })
  console.log(data.value)
  await onList();

}
onMounted(async () => {
  await onList();
});
</script>
<template>
  <div>기본 설정 완료</div>
  <CommonInput v-model="inputValue" :placeholder="'공통컴포넌트 테스트 '" />
  <CommonGrid :dataItems="listData" :columns="columns" @callBack="onDataHanddler"/>
</template>
