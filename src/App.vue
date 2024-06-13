<template>
    <div id="app">
        <Header/>
        <div style="display: flex; height: 100%">
            <Aside/>
            <router-view style="flex: 1"/>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";

export default {
    components: {
        Header,
        Aside
    }
}

</script>

<style>
#app{
    height: 100%;
}
</style>
