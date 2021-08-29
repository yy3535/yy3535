<template>
  <div class="qisi-cat">
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .qisi-cat{
    width:150px;
    height:150px;
    background-repeat: no-repeat;
    animation: run 1s;
    animation-timing-function: step(1);
    animation-iteration-count: infinite;
  }
  @keyframes run{
    0%{
      background-image: url(./imgs/tiantiansifangmao/tiantiansifangmao-08.png)
    }
    100%{
      background-image: url(./imgs/tiantiansifangmao/tiantiansifangmao-17.png)
    }
  }
</style>