<template>
  <div class="underline-box">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .underline-box{
    text-decoration: underline;
    text-decoration-color: red;
  }
</style>