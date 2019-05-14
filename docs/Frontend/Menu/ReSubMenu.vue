<template>
    <SubMenu>
        <template #title>
            {{data.title}}
        </template>
        <template v-for="child in data.children">
            <MenuItem :key="child.title" v-if="!child.children">{{child.title}}</MenuItem>
            <ReSub :key="child.title" v-else :data="child"></ReSub>
        </template>
    </SubMenu>
</template>
<script>
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
export default {
    name:'ReSub',//可以使用递归组件
    props:{
        data:{
            type:Object,
            default:()=>({})
        },
    },
    components:{
        SubMenu,MenuItem
    }
}
</script>
<style>

</style>

