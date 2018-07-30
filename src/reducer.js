import { actionTypes } from "./actions.js";
    
export const initialState={
    listState:{
        list:[],
        toplayIndex:null,
        playingIndex:null,
        pausedIndex:null,
        focusedIndex:null,
        hoveredIndex:null,
    },

    playerState: {
        controlsState:{
            switchIsOn: false,
            currentTime: 0,
            currentCache: 0,
            duration: 0,
            volume: 0.5,
        },
        audioState: {
            src: "",
            canPlay: false,
            isPlaying: false,
            forcedCurrentTime: null,
            volume: 0.5,
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
