<script setup="ts"></script>
<template>
  <slot name="header">
    <LayoutType1Header />
  </slot>

  <div class="wrap">
    <div class="container">
      <div class="content">
        <slot />
      </div>
    </div>
  </div>

  <slot name="footer">
    <LayoutType1Footer />
  </slot>
</template>
