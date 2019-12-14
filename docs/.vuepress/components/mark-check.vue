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
    left:350px;
    z-index:10;
    input{
      display:none;
    }
    input+label{
      background:url(./imgs/check.png) left center no-repeat;
      background-size:50px 50px;
      height:50px;
      display: block;
      padding-left:50px;
      user-select: none;
      color:red;
    }
    input:checked+label{
      background-image:url(./imgs/checked.png);
    }
  }
  
</style>