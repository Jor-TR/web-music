import { actionTypes } from "./actions.js";
    
export const initialState={

    // 音乐列表状态
    listState:{
        list:[], // 音乐列表
        toplayIndex:null, // 即将播放/播放/暂停 中的音乐所处的条目的下标(从0开始计)
        playingIndex:null, // 播放标志所处的条目的下标
        pausedIndex:null, // 暂停标志所处的条目的下标
        focusedIndex:null, // 聚焦的条目的下标
        hoveredIndex:null, // 光标悬浮在其上的条目的下标
    },

    // 播放器状态
    playerState: {
        controlsState:{
            switchIsOn: false, // 播放控件是否开启
            currentTime: 0, // 当前播放进度
            currentCache: 0, // 当前缓冲进度
            duration: 0, // 播放总时长
            volume: 0.5, // 音量
        },
        audioState: {
            src: "", // 当前指向的资源路径
            canPlay: false,  // 当前资源是否有效
            isPlaying: false, // 是否正在播放
            forcedCurrentTime: null, // 是否收到一个进度跳转的动作。如果没有，或者已经执行完这个动作，置为null
            volume: 0.5, // 实际音量
        }
    }
};

const listReducer=(state=[],action)=>{
    switch(action.type){
        case actionTypes.UPDATE_LIST:
            return action.newList;
        default:
            return state;
    }
};

const listStateReducer=(state={},action)=>{
    switch(action.type){
        case actionTypes.UPDATE_LIST:
            return {
                list:listReducer(state.list,action),
                toplayIndex: null,
                playingIndex: null,
                pausedIndex: null,
                focusedIndex: null,
                hoveredIndex: null,
            };
        case actionTypes.CHANGE_FOCUSED_INDEX:
            return {
                ...state,
                focusedIndex: action.newIndex,
            };
        case actionTypes.CHANGE_HOVERED_INDEX:
            return {
                ...state,
                hoveredIndex: action.newIndex,
            };
        case actionTypes.CHANGE_SRC:
            return {
                ...state,
                toplayIndex:action.index,
                playingIndex:null,
                pausedIndex:null,
            };
        case actionTypes.PLAY_MUSIC:
            return{
                ...state,
                playingIndex:state.toplayIndex,
                pausedIndex:null,
            }            
        case actionTypes.PAUSE_MUSIC:
            return{
                ...state,
                pausedIndex:state.toplayIndex,
                playingIndex:null,
            }            
        default:
            return state;
    }
};

const controlsStateReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SRC:
            return {
                ...state,
                switchIsOn: false,
                currentTime:0,
                currentCache:0,
                duration:0,
                volume:state.volume,
            };
        case actionTypes.PLAY_MUSIC:
            return {
                ...state,
                switchIsOn:true,
            };
        case actionTypes.KEEP_PLAYING:
            return {
                ...state,
                switchIsOn:true,
                currentTime:action.currentTime,
                currentCache:action.currentCache,
                duration:action.duration,
            };
        case actionTypes.PAUSE_MUSIC:
            return {
                ...state,
                switchIsOn:false,
            };
        case actionTypes.CHANGE_VOLUMN:
            return {
                ...state,
                volume:action.volume,
            };
        default:
            return state;
    }
};

const audioStateReducer=(state={},action)=>{
    switch(action.type){
        case actionTypes.CHANGE_SRC:
            return {
                src:action.src,
                canPlay:false,
                isPlaying:false,
                currentTime:0,
                forcedCurrentTime: null,
                volume:state.volume,
            };
        case actionTypes.CAN_PLAY:
            return {
                ...state,
                canPlay:true,
            };
        case actionTypes.PLAY_MUSIC:
            return {
                ...state,
                isPlaying:true,
            };
        case actionTypes.PAUSE_MUSIC:
            return {
                ...state,
                isPlaying:false,
            };
        case actionTypes.CHANGE_CURRENT_TIME:
            if (state.canPlay === true) {
                return {
                    ...state,
                    isPlaying:true,
                    forcedCurrentTime: action.newSec,
                };
            }else{
                return state;
            }
        case actionTypes.CHANGE_VOLUMN:
            return {
                ...state,
                volume:action.volume,
            };
        default:
            return state;
    }
};

const playerStateReducer=(state={},action)=>{
    switch(action.type){
        case actionTypes.CHANGE_SRC:
            return{
                controlsState: controlsStateReducer(state.controlsState, action),
                audioState: audioStateReducer(state.audioState, action),
            };
        case actionTypes.CAN_PLAY:
        case actionTypes.CHANGE_CURRENT_TIME:
            return {
                ...state,
                audioState:audioStateReducer(state.audioState,action),
            };
        case actionTypes.PLAY_MUSIC:
            if(state.audioState.canPlay===true&&state.audioState.isPlaying===false){
                return {
                    controlsState: controlsStateReducer(state.controlsState, action),
                    audioState: audioStateReducer(state.audioState, action),
                };
            }else{
                return state;
            }
        case actionTypes.KEEP_PLAYING:
            return {
                ...state,
                controlsState:controlsStateReducer(state.controlsState,action),
            };
        case actionTypes.PAUSE_MUSIC:
            if(state.audioState.isPlaying===true){
                return {
                    controlsState: controlsStateReducer(state.controlsState, action),
                    audioState: audioStateReducer(state.audioState, action),
                };
            }else{
                return state;
            }
        case actionTypes.CHANGE_VOLUMN:
            return {
                ...state,
                controlsState: controlsStateReducer(state.controlsState, action),
                audioState: audioStateReducer(state.audioState, action),
            }
        default:
            return state;
    }
};

export const reducer=(state={},action)=>{
    switch(action.type){
        case actionTypes.UPDATE_LIST:
        case actionTypes.CHANGE_FOCUSED_INDEX:
        case actionTypes.CHANGE_HOVERED_INDEX:
            return {
                ...state,
                listState:listStateReducer(state.listState,action),
            };
        case actionTypes.CHANGE_SRC:
            if (state.playerState.audioState.src !== action.src) {
                return {
                    playerState: playerStateReducer(state.playerState, action),
                    listState: listStateReducer(state.listState, action),
                };
            } else {
                return state;
            }
        case actionTypes.PLAY_MUSIC:
        case actionTypes.PAUSE_MUSIC:
            return {
                playerState:playerStateReducer(state.playerState,action),
                listState:listStateReducer(state.listState,action),
            };
        case actionTypes.CAN_PLAY:
        case actionTypes.KEEP_PLAYING:
        case actionTypes.CHANGE_CURRENT_TIME:
        case actionTypes.CHANGE_VOLUMN:
            return{
                ...state,
                playerState:playerStateReducer(state.playerState,action),
            };
        default:
            return state;
    }
};
