<script setup lang="ts">
interface ListDataType {
  id: string;
  userName: string;
  itemOneName: string;
  itemOneSerialInfo: string;
  itemTwoName: string;
  itemTwoSerialInfo: string;
  itemThreeName: string;
  itemThreeSerialInfo: string;
}
const listData = ref<ListDataType[]>([]);
const onList = async () => {
  const { data, error, count } = await useFetchApi("/user-master", {
    method: "get",
  });
  console.log(error.value);
  console.log(data.value);
  listData.value = data.value as ListDataType[];
};
const inputValue = ref<string>("");
onMounted(async () => {
  await onList();
});
</script>
<template>
  <div>기본 설정 완료</div>
  <CommonInput v-model="inputValue" :placeholder="'공통컴포넌트 테스트 '" />
  <div v-if="listData.length > 0" v-for="(item, idx) in listData" :key="idx">
    {{ item.userName }}
    {{ item.id }}
  </div>
</template>
