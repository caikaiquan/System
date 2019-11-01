import types from './types'
export default {
    // 保存浏览器窗口的宽度
    [types.SAVE_WIN_WIDTH](state, width){
        state.winWidth = width
    },
    [types.SET_All_COLLECTOR](state,data){
        state.allCollector = data
    },
    [types.SET_COLLECTORID](state,data){
        state.CollectorId = data
    },
    [types.SET_CHANNEL_NOTES](state,data){
        state.ChannelNotes = data
    },
    [types.SET_CHANNEL_ID](state,option){
        state.ChannelId = option
    },
    [types.SET_TIME_QUANTUM](state,optionArr){
        state.timeQuantum = optionArr
    }
}