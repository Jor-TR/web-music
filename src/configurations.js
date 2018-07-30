export const serverConfig = {
    musicListMethod: "GET",
    musicListPath: "http://192.168.199.29:3000/scripts/music_list",
    musicListQueryName: "musicName",
    musicFileMethod: "GET",
    musicFilePath: "http://192.168.199.29:3000/scripts/music_file",
    musicFileQueryName: "musicId",
};

export const appConfig = {
    playerRepaintInterval: 17,
    maxlistRows: 10,
};

Object.freeze(serverConfig);
Object.freeze(appConfig);
