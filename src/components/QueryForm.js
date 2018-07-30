import * as funcs from "../functions.js";
import { serverConfig } from "../configurations.js";
import { actions } from "../actions.js"
import React from "react";
import PropTypes from "prop-types";

export class QueryForm extends React.Component {
    constructor(props) {
        super(props);
        this.onsubmit = this.onsubmit.bind(this);
    }

    static propTypes = {

    }

    static defaultProps = {

    }

    static contextTypes={
        store:PropTypes.object,
    }

    // 向服务器提交查询，从服务器接收JSON格式的音乐信息
    onsubmit(event) {
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            console.log(xhr.status, xhr.statusText);
            if (xhr.status === 200) {
                console.log(xhr.responseText);

                // 把[获得各媒体文件时长]这一系列异步任务作为一系列Promise装入数组
                const musicInfoArr = JSON.parse(xhr.responseText);
                const promises = musicInfoArr.map((obj) => {
                    return new Promise((resolve, reject) => {

                        // 利用临时创建的audio元素，从接收到的媒体元数据中获知媒体文件的时长
                        const tempAudio = document.createElement("audio");
                        tempAudio.autoplay = false;
                        tempAudio.preload = "metadata";
                        funcs.addOnceEventListener(tempAudio, "loadedmetadata", () => {
                            obj.duration = tempAudio.duration;
                            resolve();
                        }, false);
                        funcs.addOnceEventListener(tempAudio, "error", () => {
                            reject();
                        }, false)
                        tempAudio.src = serverConfig.musicFilePath + "?" + serverConfig.musicFileQueryName + "=" + obj.id;
                    });
                });

                // 只有当前面的异步任务全部成功完成，才开始渲染音乐目录
                const { store } = this.context;
                Promise.all(promises).then(() => {
                    store.dispatch(actions.updateList(musicInfoArr));
                }, () => {
                    throw new Error("updateMusicList: something wrong");
                });
            }
            xhr.onload = null;
            xhr.onerror = null;
        };
        xhr.onerror = () => {
            xhr.onload = null;
            xhr.onerror = null;
            throw new Error(xhr.responseText);
        };
        const querystr = "?" + encodeURIComponent(serverConfig.musicListQueryName) + "=" + encodeURIComponent(this.refs._queryText.value);
        xhr.open(serverConfig.musicListMethod, serverConfig.musicListPath + querystr, true);
        xhr.send(null);
    }

    render() {
        return (
            <form id="queryForm" method="get" action="/scripts/music_list" onSubmit={this.onsubmit}>
                <input id="queryText" ref="_queryText" type="text" name="musicName" 
                placeholder="输入*搜索所有曲目" required autoFocus autoComplete="off" />
                <input type="submit" value="搜索" />
            </form>
        );
    }
}
