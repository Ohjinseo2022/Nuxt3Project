<script setup lang="ts">
definePageMeta({
  layout: "layout-type",
});

const columns = [
  {
    field: "userName",
    title: "이름",
  },
  { field: "col1", title: "A1" },
  { field: "col2", title: "A2" },
  { field: "col3", title: "A3" },
  { field: "col4", title: "A4" },
  { field: "col5", title: "A5" },
  { field: "col6", title: "A6" },
  { field: "col7", title: "A7", cell: "command" },
];
const listData = ref<dataItem[]>([]);
const onList = async () => {
  const { data, error, count } = await useFetchApi("/user-master", {
    method: "get",
  });
  if (!error.value) {
    const result = data.value as dataItem[];
    listData.value = result.map((item, idx) => {
      return {
        index: idx,
        id: item.id,
        userName: item.userName,
        col1: item.itemOneName,
        col2: item.itemOneSerialInfo,
        col3: item.itemTwoName,
        col4: item.itemTwoSerialInfo,
        col5: item.itemThreeName,
        col6: item.itemThreeSerialInfo,
      };
    });
  }
};
// const vue3SimpleHtml2pdf = ref<any>()
// const  pdfOptions = {
//   margin: 15,
//   image: {
//     type: 'jpeg',
//     quality: 1,
//   },
//   html2canvas: { scale: 3 },
//   jsPDF: {
//     unit: 'mm',
//     format: 'a4',
//     orientation: 'p',
//   },
// }
const exportPdf = ref<any>();
const dddd = (htmlDocument: string) => {
  console.log("클릭");
  let initBody = document.body.innerHTML;

  window.onbeforeprint = () => {
    initBody = document.body.innerHTML;
    document.body.innerHTML = exportPdf.value.innerHTML;
  };
  window.onafterprint = () => {
    document.body.innerHTML = initBody;
  };
  window.print();
};
const inputValue = ref<string>("");
const onDataHanddler = async (
  dataitems: dataItem[],
  addItem: dataItem,
  trigger: string
) => {
  if (trigger === "save") {
    listData.value = dataitems;
    await onInsert(addItem);
    return;
  } else if (trigger === "update") {
    await onUpdate(addItem);
    return;
  } else if (trigger === "delete") {
    await onDelete(addItem.id);
    return;
  }
};
const onDelete = async (id: string) => {
  //삭제 기능 구현하기용!
  const { data, error } = await useFetchApi(`/user-master/delete/${id}`, {
    method: "put",
  });
  //Nitro 버전 문제로인해 delete 메소드는 proxy 설정 적용이 안됩니다....ㅆ....
  if (!error.value) {
    await onList();
  }
};
const onUpdate = async (dataItem: dataItem) => {
  //id가 있다면 업데이트
  const reqBody = {
    id: dataItem.id,
    userName: dataItem.userName,
    itemOneName: dataItem.col1,
    itemOneSerialInfo: dataItem.col2,
    itemTwoName: dataItem.col3,
    itemTwoSerialInfo: dataItem.col4,
    itemThreeName: dataItem.col5,
    itemThreeSerialInfo: dataItem.col6,
  };
  const { data, error } = await useFetchApi(
    `/user-master/update/${dataItem.id}`,
    {
      method: "put",
      body: reqBody,
    }
  );
  await onList();
};
const onInsert = async (dataItem: dataItem) => {
  //id가 없다면 추가
  const reqBody = {
    id: generateRandomString(10),
    userName: dataItem.userName,
    itemOneName: dataItem.col1,
    itemOneSerialInfo: dataItem.col2,
    itemTwoName: dataItem.col3,
    itemTwoSerialInfo: dataItem.col4,
    itemThreeName: dataItem.col5,
    itemThreeSerialInfo: dataItem.col6,
  };
  const { data, error } = await useFetchApi("/user-master/create", {
    method: "POST",
    body: reqBody,
  });
  await onList();
};
onMounted(async () => {
  await onList();
});
</script>
<template>
  <!-- <Vue3SimpleHtml2pdf ref="vue3SimpleHtml2pdf" :options="pdfOptions" :filename="'파일 다운로드 테스트'"> -->
  <!-- <CommonInput v-model="inputValue" :placeholder="'공통컴포넌트 테스트 '" /> -->
  <div ref="exportPdf" id="exportPdf">
    <CommonGrid
      :dataItems="listData"
      :columns="columns"
      @callBack="onDataHanddler"
    />
  </div>
  <!-- </Vue3SimpleHtml2pdf> -->
  <!-- <Button @click="dddd">눌러 보쇼</Button> -->
</template>
