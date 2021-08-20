<template>
  <div class="check">
    <input type="checkbox" :id="id">
    <label :for=id></label>
  </div>
</template>

<script>
  export default {
    props:{
      id:{
        require:true,
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  .check {
    position: absolute;
    left:0;
    z-index:10;
    input{
      display:none;
    }
    input+label{
      background:url(./imgs/check.png) left center no-repeat;
      background-size:30px 30px;
      height:30px;
      display: block;
      padding-left:30px;
      user-select: none;
      color:red;
    }
    input:checked+label{
      background-image:url(./imgs/checked.png);
    }
  }
  
</style>