import types from './types'
export default {
    saveWinWidth({commit} , width){
        commit(types.SAVE_WIN_WIDTH,width)
    }
}