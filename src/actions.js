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

    // 更新音乐列表信息
    updateList: (newList) => ({
        type: actionTypes.UPDATE_LIST,
        newList,
    }),

    // 改变聚焦的条目
    changeFocusedIndex:(newIndex)=>({
        type:actionTypes.CHANGE_FOCUSED_INDEX,
        newIndex,
    }),

    // 鼠标移动时悬停在不同的条目之上
    changeHoveredIndex:(newIndex)=>({
        type:actionTypes.CHANGE_HOVERED_INDEX,
        newIndex,
    }),

    // 为了播放新的音乐而改变audio元素的src
    changeSrc: (src,index) => ({
        type: actionTypes.CHANGE_SRC,
        index,
        src,
    }),

    // 切换到新的音乐路径之后，如果发现路径有效且音乐元信息已成功载入，则允许播放
    allowToPlay:()=>({
        type: actionTypes.CAN_PLAY,
    }),

    // 请求播放
    play: () => ({
        type: actionTypes.PLAY_MUSIC,
    }),

    // 告知Redux，音乐正在正常播放，并改变当前的进度状态
    keepPlaying:(currentTime,currentCache,duration)=>({
        type:actionTypes.KEEP_PLAYING,
        currentTime,
        currentCache,
        duration,
    }),

    // 请求暂停播放
    pause: () => ({
        type: actionTypes.PAUSE_MUSIC,
    }),

    // 进度条意图发生跳转，要强制更改进度状态
    changeCurrentTime:(newSec)=>({
        type:actionTypes.CHANGE_CURRENT_TIME,
        newSec,
    }),

    // 改变音量
    changeVolume:(volume)=>({
        type:actionTypes.CHANGE_VOLUMN,
        volume,
    }),
};
