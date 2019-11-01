import types from './types'
export default {
    saveWinWidth({commit} , width){
        commit(types.SAVE_WIN_WIDTH,width)
    },
    setAllCollector({commit} ,data){
        commit(types.SET_All_COLLECTOR,data)
    },
    setCollectorId({commit},option){
        commit(types.SET_COLLECTORID,option)
    },
    setChannelNotes({commit},data){
        commit(types.SET_CHANNEL_NOTES,data)
    },
    setChannelId({commit},option){
        commit(types.SET_CHANNEL_ID,option)
    },
    setTimeQuantum({commit},data){ 
        commit(types.SET_TIME_QUANTUM,data)
    }
}