<template>
    <div id="key_list"></div>
</template>
    
<script>
import aplush from "@/api/A+";
export default {
    name: 'Key',
    data() {
        return {
            title: 'Key'
        }
    },
    mounted() {
        //console.log('Component mounted.')
    },
    methods: {
       get_baseDate(){
           aplush.
       }
    }
}
</script>
    
<style lang="scss">
#key_list {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
</style>
