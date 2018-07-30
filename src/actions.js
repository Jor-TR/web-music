export const actionTypes={
    UPDATE_LIST:"UPDATE_LIST",
    CHANGE_FOCUSED_INDEX:"CHANGE_FOCUSED_INDEX",
    CHANGE_HOVERED_INDEX:"CHANGE_HOVERED_INDEX",

    CHANGE_SRC:"CHANGE_SRC",
    CAN_PLAY:"CAN_PLAY",
    PLAY_MUSIC:"PLAY_MUSIC",
    KEEP_PLAYING:"KEEP_PLAYING" ,
    PAUSE_MUSIC:"PAUSE_MUSIC",
    CHANGE_CURRENT_TIME:"CHANGE_CURRENT_TIME",
    CHANGE_VOLUMN:"CHANGE_VOLUME",
};

export const actions = {
    updateList: (newList) => ({
        type: actionTypes.UPDATE_LIST,
        newList,
    }),
    changeFocusedIndex:(newIndex)=>({
        type:actionTypes.CHANGE_FOCUSED_INDEX,
        newIndex,
    }),
    changeHoveredIndex:(newIndex)=>({
        type:actionTypes.CHANGE_HOVERED_INDEX,
        newIndex,
    }),
    changeSrc: (src,index) => ({
        type: actionTypes.CHANGE_SRC,
        index,
        src,
    }),
    allowToPlay:()=>({
        type: actionTypes.CAN_PLAY,
    }),
    play: () => ({
        type: actionTypes.PLAY_MUSIC,
    }),
    keepPlaying:(currentTime,currentCache,duration)=>({
        type:actionTypes.KEEP_PLAYING,
        currentTime,
        currentCache,
        duration,
    }),
    pause: () => ({
        type: actionTypes.PAUSE_MUSIC,
    }),
    changeCurrentTime:(newSec)=>({
        type:actionTypes.CHANGE_CURRENT_TIME,
        newSec,
    }),
    changeVolume:(volume)=>({
        type:actionTypes.CHANGE_VOLUMN,
        volume,
    }),
};
