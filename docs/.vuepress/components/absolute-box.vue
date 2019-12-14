<template>
  <div class="absolute-box">
    <p>
      <slot></slot>
    </p>
    
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .absolute-box{
    position: absolute;
    right:20px;
    width:200px;
    z-index:10;
    overflow: auto;
    background: #ffe6e6;
    border-color:#c00;
    color:#4d0000;
    border-left-width:0.5rem;
    border-left-style:solid;
    margin:1rem 0;
    padding:0.1rem 1.5rem;
  }
</style>