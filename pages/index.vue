<script setup lang="ts">
const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
  console.log(route.fullPath);
  if (route.fullPath === "/") {
    router.push({ path: "/main/MainPage" });
  }
});
</script>
<template>
  <div></div>
</template>
