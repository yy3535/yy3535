<template>
  <div class='layout'>
    <p class='title'>我将茫茫人海中,寻找唯一灵魂伴侣,得之我幸,失之我命</p>
    <section class='block'>
      <div class='left'>
          <img src="../public/img/1.jpg" alt="">
          <p>北麒</p>
      </div>
      <ul class="right">
         <li>name：{{name}}</li>
         <li>company：{{company}}</li> 
         <li>Occupation：{{Occupation}}</li> 
         <li>contact：{{contact}}</li> 
      </ul>
    </section>
    <section class='block'>
      <div class='left'>
          <img src="../public/img/1.jpg" alt="">
          <p>北麒</p>
      </div>
      <ul class="right">
         <li>name：{{name}}</li>
         <li>company：{{company}}</li> 
         <li>Occupation：{{Occupation}}</li> 
         <li>contact：{{contact}}</li> 
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        name:'宋格',
        company:'anystraming',
        Occupation:'前端',
        contact:'123'
      }
    }
  }
</script>

<style scoped lang = 'scss'>
.layout{
  display:flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  /* width:960px; */
  .title{
    align-self: center;
    
  }
  .block{
    box-shadow : 0 2px 6px 0 #e3e7f6;
    width : 960px;
    margin-bottom: 40px;
    padding: 20px;
    display: flex;
    .left{
      width: 180px;
      display: flex;
      border-right: 1px solid #e4e4e4;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }

    }
    .right{
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding-left: 30px;
      flex: 1;
      list-style: none;
    }
  }
}
</style>