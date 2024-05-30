import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getSubscribeStatus} from '../api/competition.js'

export const useSubScribeStore = defineStore('subScribeStatus', () => {
    const subScribeStatus = ref(null)
    function setSubScribeStatus(){
        getSubscribeStatus().then((res) => {
            if (res.code === 200) {
                subScribeStatus.value = true
            }
            else if (res.code === 201) {
                subScribeStatus.value = false
            }
        }
        )}

    return {
        subScribeStatus,setSubScribeStatus
    }


    
})