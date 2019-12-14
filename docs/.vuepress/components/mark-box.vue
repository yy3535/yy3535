<template>
    <div :class="[color,'mark']">
        <p class="icon">★</p>
        <slot></slot>
        
    </div>
</template>
<script>
export default {
    props:{
        color:{
            default:'red'
        }
    }
}
</script>
<style scoped lang="scss">
    .mark{
        padding:10px;
        border-radius: 10px;
        border:3px solid red;
        position: relative;
        .icon{
            position: absolute;
            top: -92px;
            left: -23px;
            transform: rotate(28deg);
            color: red;
            font-size: 52px;
            z-index: 1;
        }
    }
    
    .red{
        border-color: red;
    }
    
</style>


