<template>
    <mobile_result v-if="isMobile"></mobile_result>
    <pc_result v-else></pc_result>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible';
import pc_result from "./pc/pc_result";
import mobile_result from "./mobile/mobile_result";

export default {
    name: "result",
    components: {pc_result,mobile_result},
    data(){
        return{
            isMobile:isMobileTerminal.value
        }
    },
    method: {
        isMobileTerminal() {
            isMobileTerminal();
        },
    },
}
</script>

