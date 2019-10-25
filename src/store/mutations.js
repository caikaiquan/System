import types from './types'
export default {
    // 保存浏览器窗口的宽度
    [types.SAVE_WIN_WIDTH](state, width){
        state.winWidth = width
    }
}