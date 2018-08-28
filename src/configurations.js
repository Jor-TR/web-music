// 这是为了前端与后端对接所约定的参数，使用不同的后端API时只要修改这里就可以了
export const serverConfig = {
    musicListMethod: "GET",
    musicListPath: "http://192.168.199.29:3000/scripts/music_list",
    musicListQueryName: "musicName",
    musicFileMethod: "GET",
    musicFilePath: "http://192.168.199.29:3000/scripts/music_file",
    musicFileQueryName: "musicId",
};

// 可以调整的某些页面设置
export const appConfig = {
    playerRepaintInterval: 17, // 播放器播放过程中需要频繁刷新，这里规定其刷新间隔
    maxlistRows: 10, // 每张音乐列表最多容纳的条目数量
};

